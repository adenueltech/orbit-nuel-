export class SettingsResponseDto {
  id: number;
  bio?: string;
  location?: string;
  companyWebsite?: string;
  companyIndustry?: string;
  companySize?: string;
  companyDescription?: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  marketingCommunications: boolean;
  twoFactorEnabled: boolean;
  allowTeamInvites: boolean;
  requireAdminApproval: boolean;
  allowExternalSharing: boolean;
  theme: string;
  language: string;
  subscriptionPlan?: string;
  billingStatus: string;
}
