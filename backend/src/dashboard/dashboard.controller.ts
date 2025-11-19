import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  async getOverview(@Request() req: any) {
    const organizationId =
      req.tenant?.organizationId || req.user?.organizationId;
    return this.dashboardService.getOverviewData(organizationId);
  }
}
