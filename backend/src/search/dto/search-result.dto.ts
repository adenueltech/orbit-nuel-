import { SearchEntityType } from './search-query.dto';

export class SearchResultItem {
  id: number;
  entityType: SearchEntityType;
  entityId: number;
  title: string;
  content: string;
  metadata: Record<string, any>;
  relevanceScore: number;
  highlights?: string[];
}

export class SearchResultDto {
  items: SearchResultItem[];
  total: number;
  hasMore: boolean;
  query: string;
  took: number; // search time in milliseconds
}
