import { IsOptional, IsString, IsEnum, IsInt, Min, Max, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export enum SearchEntityType {
  PROJECT = 'project',
  TASK = 'task',
  FILE = 'file',
  USER = 'user',
  ALL = 'all',
}

export enum SortBy {
  RELEVANCE = 'relevance',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class SearchQueryDto {
  @IsString()
  q: string;

  @IsOptional()
  @IsEnum(SearchEntityType)
  type?: SearchEntityType = SearchEntityType.ALL;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.RELEVANCE;

  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;
}