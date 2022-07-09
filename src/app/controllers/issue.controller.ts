import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IssueService } from 'app/services';
import { UpdateIssueReq, IssueReq, IssueQuery } from 'app/dto';
import { IssueEntity } from 'app/entities';

@ApiTags('Issues')
@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @ApiOperation({
    description: 'Create Issue',
  })
  @Post()
  create(@Body() data: IssueReq) {
    return this.issueService.create(data);
  }

  @ApiOperation({
    description: 'Find all issues',
  })
  @Get()
  findAll() {
    return this.issueService.findAll();
  }

  @ApiOperation({
    description: 'Find issues by agent',
  })
  @Get('/agent/:id')
  findByAgent(
    @Param('id', ParseIntPipe) agentId: number,
    @Query() { status }: IssueQuery,
  ): Promise<IssueEntity[]> {
    return this.issueService.findByAgent(agentId, status);
  }

  @ApiOperation({
    description: 'Find issues by user',
  })
  @Get('/user/:id')
  findByUser(
    @Param('id', ParseIntPipe) userId: number,
    @Query() { status }: IssueQuery,
  ): Promise<IssueEntity[]> {
    return this.issueService.findByUser(userId, status);
  }

  @ApiOperation({
    description: 'Update issue',
  })
  @Patch(':issueId/agent/:agentId')
  update(
    @Param('issueId', ParseIntPipe) issueId: number,
    @Param('agentId', ParseIntPipe) agentId: number,
    @Body() data: UpdateIssueReq,
  ) {
    return this.issueService.update(issueId, agentId, data);
  }
}
