import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IssueService } from 'app/services';
import { UpdateIssueReq, IssueReq } from 'app/dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Issues')
@Controller('issue')
export class IssueController {
  constructor(private readonly supportService: IssueService) {}

  @ApiOperation({
    description: 'Create Issue',
  })
  @ApiCreatedResponse({
    description: 'The issue has been successfully created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error',
  })
  @ApiBody({
    type: IssueReq,
  })
  @Post()
  create(@Body() data: IssueReq) {
    return this.supportService.create(data);
  }

  @Get()
  findAll() {
    return this.supportService.findAll();
  }

  @Get('/agent/:id')
  findByAgent(@Param('id', ParseIntPipe) agentId: number) {
    return this.supportService.findByAgent(agentId);
  }

  @ApiBody({
    type: UpdateIssueReq,
  })
  @Patch(':issueId/agent/:agentId')
  update(
    @Param('issueId', ParseIntPipe) issueId: number,
    @Param('agentId', ParseIntPipe) agentId: number,
    @Body() data: UpdateIssueReq,
  ) {
    return this.supportService.update(issueId, agentId, data);
  }
}
