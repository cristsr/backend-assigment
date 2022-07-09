import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity, IssueEntity, UserEntity } from 'app/entities';
import {
  IssueController,
  AgentController,
  UserController,
} from 'app/controllers';
import { IssueService, AgentService, UserService } from 'app/services';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity, IssueEntity, UserEntity])],
  controllers: [IssueController, AgentController, UserController],
  providers: [IssueService, AgentService, UserService],
})
export class AppModule {}
