import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('search_analytics')
@Index(['userId', 'timestamp'])
@Index(['query', 'timestamp'])
export class SearchAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'text' })
  query: string;

  @Column({ type: 'int', default: 0 })
  resultCount: number;

  @Column({ type: 'json', nullable: true })
  filters: Record<string, any>;

  @Column({ type: 'varchar', length: 50, nullable: true })
  searchType: string; // 'global', 'project', 'task', etc.

  @Column({ type: 'int', default: 0 })
  clickCount: number;

  @Column({ type: 'int', default: 0 })
  timeSpent: number; // in milliseconds

  @CreateDateColumn()
  timestamp: Date;
}
