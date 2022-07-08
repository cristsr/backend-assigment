import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgentReq } from 'app/dto';
import { AgentService } from 'app/services';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AgentEntity } from 'app/entities';

@ApiTags('Agent')
@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @ApiOperation({
    description: 'Create Agent',
  })
  @ApiCreatedResponse({
    description: 'The issue has been successfully created.',
    type: AgentEntity,
  })
  @Post()
  create(@Body() data: AgentReq) {
    return this.agentService.create(data);
  }

  @ApiOperation({
    description: 'Find all agents',
  })
  @ApiOkResponse({
    description: 'The agent list has been successfully found.',
    type: [AgentEntity],
  })
  @Get()
  findAll() {
    return this.agentService.findAll();
  }
}
