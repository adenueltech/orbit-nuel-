import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchIndex } from './entities/search-index.entity';
import { SearchAnalytics } from './entities/search-analytics.entity';
import { SearchHistory } from './entities/search-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchIndex, SearchAnalytics, SearchHistory]),
    CacheModule.register({
      ttl: 300000, // 5 minutes
      max: 1000, // maximum number of items in cache
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
