import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity, IssueEntity, UserEntity } from 'app/entities';
import { IssueController, AgentController } from 'app/controllers';
import { IssueService, AgentService } from 'app/services';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity, UserEntity, IssueEntity])],
  controllers: [IssueController, AgentController],
  providers: [IssueService, AgentService],
})
export class AppModule {}
