import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('search_history')
@Index(['userId', 'timestamp'])
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'text' })
  query: string;

  @Column({ type: 'json', nullable: true })
  filters: Record<string, any>;

  @Column({ type: 'int', default: 0 })
  resultCount: number;

  @CreateDateColumn()
  timestamp: Date;
}
