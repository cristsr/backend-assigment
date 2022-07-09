import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AgentEntity, UserEntity } from 'app/entities';
import { IssueStatus } from 'app/types';

@Entity('issues')
export class IssueEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: IssueStatus,
    default: IssueStatus.created,
  })
  status: IssueStatus;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.issues, { nullable: true })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => AgentEntity, (agent) => agent.issues, { nullable: true })
  @JoinColumn()
  agent: AgentEntity;
}
