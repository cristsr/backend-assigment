import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IssueService } from 'app/services';
import { UpdateIssueReq, IssueReq } from 'app/dto';
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
  ): Promise<IssueEntity[]> {
    return this.issueService.findByAgent(agentId);
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
