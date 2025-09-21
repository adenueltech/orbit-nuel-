import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'member'],
    default: 'member',
  })
  role: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;

  @Column()
  phone: string;

  @Column()
  hireDate: Date;
}
