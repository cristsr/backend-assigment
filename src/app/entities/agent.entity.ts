import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IssueEntity } from './issue.entity';
import { AgentStatus } from '../types';
import { ApiProperty } from '@nestjs/swagger';

@Entity('agents')
export class AgentEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AgentStatus,
    default: AgentStatus.free,
  })
  status: AgentStatus;

  @OneToMany(() => IssueEntity, (issue) => issue.agent)
  issues: IssueEntity[];
}
