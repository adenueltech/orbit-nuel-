import { IsBoolean, IsOptional, IsString, IsUrl, IsIn } from 'class-validator';

export class UpdateSettingsDto {
  // Profile settings
  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  // Company settings
  @IsUrl({}, { message: 'Website must be a valid URL' })
  @IsOptional()
  companyWebsite?: string;

  @IsString()
  @IsOptional()
  companyIndustry?: string;

  @IsIn(['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees'])
  @IsOptional()
  companySize?: string;

  @IsString()
  @IsOptional()
  companyDescription?: string;

  // Notification settings
  @IsBoolean()
  @IsOptional()
  emailNotifications?: boolean;

  @IsBoolean()
  @IsOptional()
  pushNotifications?: boolean;

  @IsBoolean()
  @IsOptional()
  desktopNotifications?: boolean;

  @IsBoolean()
  @IsOptional()
  marketingCommunications?: boolean;

  // Security settings
  @IsBoolean()
  @IsOptional()
  twoFactorEnabled?: boolean;

  // Team settings
  @IsBoolean()
  @IsOptional()
  allowTeamInvites?: boolean;

  @IsBoolean()
  @IsOptional()
  requireAdminApproval?: boolean;

  @IsBoolean()
  @IsOptional()
  allowExternalSharing?: boolean;

  // Appearance settings
  @IsIn(['light', 'dark', 'system'])
  @IsOptional()
  theme?: string;

  @IsString()
  @IsOptional()
  language?: string;

  // Billing settings
  @IsString()
  @IsOptional()
  subscriptionPlan?: string;

  @IsIn(['active', 'inactive', 'cancelled'])
  @IsOptional()
  billingStatus?: string;
}