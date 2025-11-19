import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  subdomain: string;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @Column()
  createdAt: Date;
}
