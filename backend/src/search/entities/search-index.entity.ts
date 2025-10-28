import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SearchEntityType {
  PROJECT = 'project',
  TASK = 'task',
  FILE = 'file',
  USER = 'user',
}

@Entity('search_index')
@Index(['entityType', 'entityId'], { unique: true })
@Index(['content'], { fulltext: true })
export class SearchIndex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SearchEntityType,
  })
  entityType: SearchEntityType;

  @Column()
  entityId: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'float', default: 1.0 })
  relevanceScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}