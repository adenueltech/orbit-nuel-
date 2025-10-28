import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  priority: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  assignee: User;

  @Column({ nullable: true })
  assigneeId: number;

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  @Column({ nullable: true })
  organizationId: number;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn()
  project: Project;

  @Column({ nullable: true })
  projectId: number;

  @Column()
  dueDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('json', { nullable: true })
  comments: { text: string; author: string; timestamp: Date }[];

  @Column('json', { nullable: true })
  attachments: { filename: string; url: string; uploadedAt: Date }[];

  @Column('simple-array', { nullable: true })
  tags: string[];
}
