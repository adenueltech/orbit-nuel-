import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['planning', 'in-progress', 'review', 'completed'],
    default: 'planning',
  })
  status: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  owner: User;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  @Column()
  organizationId: number;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  priority: string;

  @Column('float', { default: 0 })
  progress: number;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column('json', { nullable: true })
  teamMembers: number[];

  @Column({ nullable: true })
  color: string;
}
