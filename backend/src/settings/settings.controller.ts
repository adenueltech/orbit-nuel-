import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Request() req: any) {
    const userId = req.user?.userId;
    const organizationId = req.tenant?.organizationId;

    // Try to get user settings first
    let settings = await this.settingsService.findByUserId(userId);

    // If no user settings, try organization settings
    if (!settings && organizationId) {
      settings =
        await this.settingsService.findByOrganizationId(organizationId);
    }

    // If still no settings, create default user settings
    if (!settings) {
      await this.settingsService.createDefaultSettings(userId, organizationId);
      settings = await this.settingsService.findByUserId(userId);
    }

    if (!settings) {
      throw new NotFoundException('Settings not found');
    }

    return settings;
  }

  @Put()
  async updateSettings(
    @Request() req: any,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    const userId = req.user?.userId;
    const organizationId = req.tenant?.organizationId;

    // For organization settings, we might need different logic
    // For now, update user settings
    return this.settingsService.update(userId, updateSettingsDto);
  }
}
