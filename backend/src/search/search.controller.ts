import { Controller, Get, Post, Query, Body, UseGuards, Request, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResultDto } from './dto/search-result.dto';

@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() queryDto: SearchQueryDto, @Request() req): Promise<SearchResultDto> {
    return this.searchService.search(queryDto, req.user?.id);
  }

  @Get('suggestions')
  async getSuggestions(
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
    @Request() req,
  ): Promise<string[]> {
    return this.searchService.getSuggestions(query, req.user?.id, limit);
  }

  @Get('history')
  async getSearchHistory(
    @Query('limit') limit: number = 20,
    @Request() req,
  ) {
    return this.searchService.getSearchHistory(req.user.id, limit);
  }

  @Post('analytics/click')
  async trackClick(
    @Body() body: { searchId: string; entityType: string; entityId: number },
    @Request() req,
  ) {
    // This would update click analytics - implementation depends on your analytics service
    return { success: true };
  }

  @Post('analytics/time')
  async trackTimeSpent(
    @Body() body: { searchId: string; timeSpent: number },
    @Request() req,
  ) {
    // This would update time spent analytics
    return { success: true };
  }
}