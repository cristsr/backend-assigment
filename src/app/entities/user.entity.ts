import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IssueEntity } from './issue.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => IssueEntity, (e) => e.user)
  issues: IssueEntity[];
}
