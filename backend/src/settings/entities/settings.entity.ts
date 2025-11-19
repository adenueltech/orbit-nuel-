import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Organization)
  organization: Organization;

  // Profile settings
  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  // Company settings
  @Column({ nullable: true })
  companyWebsite: string;

  @Column({ nullable: true })
  companyIndustry: string;

  @Column({ nullable: true })
  companySize: string;

  @Column({ nullable: true })
  companyDescription: string;

  // Notification settings
  @Column({ default: true })
  emailNotifications: boolean;

  @Column({ default: true })
  pushNotifications: boolean;

  @Column({ default: false })
  desktopNotifications: boolean;

  @Column({ default: false })
  marketingCommunications: boolean;

  // Security settings
  @Column({ default: false })
  twoFactorEnabled: boolean;

  // Team settings
  @Column({ default: true })
  allowTeamInvites: boolean;

  @Column({ default: false })
  requireAdminApproval: boolean;

  @Column({ default: true })
  allowExternalSharing: boolean;

  // Appearance settings (theme, language, etc.)
  @Column({ default: 'light' })
  theme: string;

  @Column({ default: 'en' })
  language: string;

  // Billing settings (subscription plan, etc.)
  @Column({ nullable: true })
  subscriptionPlan: string;

  @Column({ default: 'active' })
  billingStatus: string;
}
