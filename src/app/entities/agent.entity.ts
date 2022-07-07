import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IssueEntity } from './issue.entity';
import { AgentStatus } from '../types';

@Entity('agents')
export class AgentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: AgentStatus,
    default: AgentStatus.free,
  })
  status: AgentStatus;

  @OneToMany(() => IssueEntity, (issue) => issue.agent)
  issues: IssueEntity[];
}
