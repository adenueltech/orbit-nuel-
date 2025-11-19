import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

interface AuthenticatedRequest extends ExpressRequest {
  user?: { organizationId: number };
  tenant?: { organizationId: number | null };
}

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getAnalytics(
    @Query('timeRange') timeRange: string = '30d',
    @Request() req: AuthenticatedRequest,
  ) {
    const organizationId =
      req.tenant?.organizationId || req.user?.organizationId;
    return this.analyticsService.getAnalyticsData(organizationId!, timeRange);
  }
}
