import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['folder', 'file'],
    default: 'file',
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['document', 'image', 'video', 'audio', 'archive', 'other'],
    nullable: true,
  })
  fileType: string;

  @Column({ nullable: true })
  size: string;

  @ManyToOne(() => User)
  @JoinColumn()
  uploadedBy: User;

  @Column()
  uploadedById: number;

  @Column({ type: 'date' })
  uploadedAt: Date;

  @Column({ type: 'date' })
  lastModified: Date;

  @Column({ default: false })
  shared: boolean;

  @Column({ default: false })
  starred: boolean;

  @Column({
    type: 'enum',
    enum: ['view', 'edit', 'admin'],
    default: 'view',
  })
  permissions: string;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn()
  project: Project;

  @Column({ nullable: true })
  projectId: number;

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  @Column()
  organizationId: number;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  preview: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}