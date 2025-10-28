import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsResponseDto } from './dto/settings-response.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async findByUserId(userId: number): Promise<SettingsResponseDto | null> {
    const settings = await this.settingsRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'organization'],
    });

    if (!settings) {
      return null;
    }

    return {
      id: settings.id,
      bio: settings.bio,
      location: settings.location,
      companyWebsite: settings.companyWebsite,
      companyIndustry: settings.companyIndustry,
      companySize: settings.companySize,
      companyDescription: settings.companyDescription,
      emailNotifications: settings.emailNotifications,
      pushNotifications: settings.pushNotifications,
      desktopNotifications: settings.desktopNotifications,
      marketingCommunications: settings.marketingCommunications,
      twoFactorEnabled: settings.twoFactorEnabled,
      allowTeamInvites: settings.allowTeamInvites,
      requireAdminApproval: settings.requireAdminApproval,
      allowExternalSharing: settings.allowExternalSharing,
      theme: settings.theme,
      language: settings.language,
      subscriptionPlan: settings.subscriptionPlan,
      billingStatus: settings.billingStatus,
    };
  }

  async findByOrganizationId(organizationId: number): Promise<SettingsResponseDto | null> {
    const settings = await this.settingsRepository.findOne({
      where: { organization: { id: organizationId } },
      relations: ['user', 'organization'],
    });

    if (!settings) {
      return null;
    }

    return {
      id: settings.id,
      bio: settings.bio,
      location: settings.location,
      companyWebsite: settings.companyWebsite,
      companyIndustry: settings.companyIndustry,
      companySize: settings.companySize,
      companyDescription: settings.companyDescription,
      emailNotifications: settings.emailNotifications,
      pushNotifications: settings.pushNotifications,
      desktopNotifications: settings.desktopNotifications,
      marketingCommunications: settings.marketingCommunications,
      twoFactorEnabled: settings.twoFactorEnabled,
      allowTeamInvites: settings.allowTeamInvites,
      requireAdminApproval: settings.requireAdminApproval,
      allowExternalSharing: settings.allowExternalSharing,
      theme: settings.theme,
      language: settings.language,
      subscriptionPlan: settings.subscriptionPlan,
      billingStatus: settings.billingStatus,
    };
  }

  async createDefaultSettings(userId: number, organizationId?: number): Promise<Settings> {
    const settings = this.settingsRepository.create({
      user: { id: userId } as any,
      organization: organizationId ? { id: organizationId } as any : undefined,
    });
    return this.settingsRepository.save(settings);
  }

  async update(userId: number, updateSettingsDto: UpdateSettingsDto): Promise<SettingsResponseDto> {
    let settings = await this.settingsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!settings) {
      settings = await this.createDefaultSettings(userId);
    }

    await this.settingsRepository.update(settings.id, updateSettingsDto);
    const updatedSettings = await this.findByUserId(userId);

    if (!updatedSettings) {
      throw new NotFoundException('Settings not found after update');
    }

    return updatedSettings;
  }

  async updateOrganizationSettings(organizationId: number, updateSettingsDto: UpdateSettingsDto): Promise<SettingsResponseDto> {
    let settings = await this.settingsRepository.findOne({
      where: { organization: { id: organizationId } },
    });

    if (!settings) {
      // For organization settings, we might need to create with a default user or handle differently
      // For now, assume organization settings are tied to a user (admin)
      throw new NotFoundException('Organization settings not found');
    }

    await this.settingsRepository.update(settings.id, updateSettingsDto);
    const updatedSettings = await this.findByOrganizationId(organizationId);

    if (!updatedSettings) {
      throw new NotFoundException('Organization settings not found after update');
    }

    return updatedSettings;
  }
}