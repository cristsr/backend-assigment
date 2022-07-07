import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IssueStatus } from '../types';
import { AgentEntity } from './agent.entity';
import { UserEntity } from './user.entity';

@Entity('issues')
export class IssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: IssueStatus,
    default: IssueStatus.created,
  })
  status: IssueStatus;

  @ManyToOne(() => UserEntity, (user) => user.issues)
  user: UserEntity;

  @ManyToOne(() => AgentEntity, (agent) => agent.issues)
  @JoinColumn()
  agent: AgentEntity;
}
