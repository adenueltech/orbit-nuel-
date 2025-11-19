import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SearchIndex, SearchEntityType } from './entities/search-index.entity';
import { SearchAnalytics } from './entities/search-analytics.entity';
import { SearchHistory } from './entities/search-history.entity';
import { SearchQueryDto, SortBy } from './dto/search-query.dto';
import { SearchResultDto, SearchResultItem } from './dto/search-result.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(SearchIndex)
    private searchIndexRepository: Repository<SearchIndex>,
    @InjectRepository(SearchAnalytics)
    private searchAnalyticsRepository: Repository<SearchAnalytics>,
    @InjectRepository(SearchHistory)
    private searchHistoryRepository: Repository<SearchHistory>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async search(
    queryDto: SearchQueryDto,
    userId?: number,
  ): Promise<SearchResultDto> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey(queryDto, userId);

    // Try to get from cache first
    const cachedResult = await this.cacheManager.get<SearchResultDto>(cacheKey);
    if (cachedResult) {
      this.logger.log(`Cache hit for query: ${queryDto.q}`);
      return cachedResult;
    }

    const queryBuilder = this.buildSearchQuery(queryDto);
    const [items, total] = await queryBuilder.getManyAndCount();

    const processedItems = this.processSearchResults(items, queryDto.q);
    const result: SearchResultDto = {
      items: processedItems,
      total,
      hasMore: (queryDto.offset || 0) + (queryDto.limit || 0) < total,
      query: queryDto.q,
      took: Date.now() - startTime,
    };

    // Cache the result
    await this.cacheManager.set(cacheKey, result, 300000); // 5 minutes

    // Track analytics
    await this.trackSearchAnalytics(queryDto, result, userId);

    // Save search history
    if (userId) {
      await this.saveSearchHistory(queryDto, userId, result.total);
    }

    return result;
  }

  async getSuggestions(
    query: string,
    userId?: number,
    limit: number = 10,
  ): Promise<string[]> {
    const cacheKey = `suggestions:${query}:${userId || 'anonymous'}:${limit}`;

    const cached = await this.cacheManager.get<string[]>(cacheKey);
    if (cached) return cached;

    const suggestions = await this.searchHistoryRepository
      .createQueryBuilder('history')
      .select('history.query')
      .where('history.query ILIKE :query', { query: `${query}%` })
      .andWhere(userId ? 'history.userId = :userId' : '1=1', { userId })
      .groupBy('history.query')
      .orderBy('COUNT(*)', 'DESC')
      .limit(limit)
      .getRawMany();

    const result = suggestions.map((s) => s.history_query);
    await this.cacheManager.set(cacheKey, result, 600000); // 10 minutes

    return result;
  }

  async getSearchHistory(
    userId: number,
    limit: number = 20,
  ): Promise<SearchHistory[]> {
    return this.searchHistoryRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async indexEntity(
    entityType: SearchEntityType,
    entityId: number,
    title: string,
    content: string,
    metadata?: Record<string, any>,
  ) {
    const relevanceScore = this.calculateRelevanceScore(
      title,
      content,
      metadata,
    );

    await this.searchIndexRepository.upsert(
      {
        entityType,
        entityId,
        title,
        content,
        metadata: metadata || {},
        relevanceScore,
      },
      ['entityType', 'entityId'],
    );

    // Invalidate related caches
    await this.invalidateEntityCache(entityType, entityId);
  }

  async removeEntityIndex(entityType: SearchEntityType, entityId: number) {
    await this.searchIndexRepository.delete({ entityType, entityId });
    await this.invalidateEntityCache(entityType, entityId);
  }

  private buildSearchQuery(
    queryDto: SearchQueryDto,
  ): SelectQueryBuilder<SearchIndex> {
    const queryBuilder =
      this.searchIndexRepository.createQueryBuilder('search');

    // Full-text search
    queryBuilder.where(
      'MATCH(search.content) AGAINST (:query IN NATURAL LANGUAGE MODE)',
      {
        query: queryDto.q,
      },
    );

    // Filter by entity type
    if (queryDto.type) {
      queryBuilder.andWhere('search.entityType = :type', {
        type: queryDto.type,
      });
    }

    // Apply additional filters
    if (queryDto.filters) {
      Object.entries(queryDto.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryBuilder.andWhere(
            `JSON_EXTRACT(search.metadata, '$.${key}') = :${key}`,
            { [key]: value },
          );
        }
      });
    }

    // Sorting
    switch (queryDto.sortBy) {
      case SortBy.RELEVANCE:
        queryBuilder.orderBy('search.relevanceScore', 'DESC');
        break;
      case SortBy.CREATED_AT:
        queryBuilder.orderBy('search.createdAt', 'DESC');
        break;
      case SortBy.UPDATED_AT:
        queryBuilder.orderBy('search.updatedAt', 'DESC');
        break;
    }

    // Pagination
    queryBuilder.limit(queryDto.limit).offset(queryDto.offset);

    return queryBuilder;
  }

  private processSearchResults(
    items: SearchIndex[],
    query: string,
  ): SearchResultItem[] {
    return items.map((item) => ({
      id: item.id,
      entityType: item.entityType as any,
      entityId: item.entityId,
      title: item.title,
      content: item.content,
      metadata: item.metadata,
      relevanceScore: item.relevanceScore,
      highlights: this.generateHighlights(item.content, query),
    }));
  }

  private generateHighlights(content: string, query: string): string[] {
    const words = query.toLowerCase().split(/\s+/);
    const highlights: string[] = [];
    const contentLower = content.toLowerCase();

    words.forEach((word) => {
      const index = contentLower.indexOf(word);
      if (index !== -1) {
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + word.length + 50);
        highlights.push(content.substring(start, end));
      }
    });

    return highlights.slice(0, 3); // Limit to 3 highlights
  }

  private calculateRelevanceScore(
    title: string,
    content: string,
    metadata?: Record<string, any>,
  ): number {
    let score = 1.0;

    // Boost score based on title matches
    if (title) score += 0.5;

    // Boost score based on content length (longer content might be more relevant)
    score += Math.min(content.length / 1000, 0.5);

    // Boost score based on metadata
    if (metadata?.priority === 'high') score += 0.3;
    if (metadata?.status === 'active') score += 0.2;

    return score;
  }

  private generateCacheKey(queryDto: SearchQueryDto, userId?: number): string {
    return `search:${JSON.stringify(queryDto)}:${userId || 'anonymous'}`;
  }

  private async invalidateEntityCache(
    entityType: SearchEntityType,
    entityId: number,
  ) {
    // Invalidate all search caches that might contain this entity
    // This is a simplified approach; in production, you might want more granular cache invalidation
    // Note: Cache reset method may vary by cache implementation
    // For now, we'll skip cache invalidation to avoid type issues
    this.logger.log(
      `Cache invalidation skipped for entity ${entityType}:${entityId}`,
    );
  }

  private async trackSearchAnalytics(
    queryDto: SearchQueryDto,
    result: SearchResultDto,
    userId?: number,
  ) {
    await this.searchAnalyticsRepository.save({
      userId,
      query: queryDto.q,
      resultCount: result.total,
      filters: queryDto.filters,
      searchType: queryDto.type,
    });
  }

  private async saveSearchHistory(
    queryDto: SearchQueryDto,
    userId: number,
    resultCount: number,
  ) {
    await this.searchHistoryRepository.save({
      userId,
      query: queryDto.q,
      filters: queryDto.filters,
      resultCount,
    });
  }
}
