import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity, IssueEntity, UserEntity } from 'app/entities';
import { IssueController } from 'app/controllers';
import { IssueService } from 'app/services';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity, UserEntity, IssueEntity])],
  controllers: [IssueController],
  providers: [IssueService],
})
export class AppModule {}
