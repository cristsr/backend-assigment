import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgentReq } from 'app/dto';
import { AgentService } from 'app/services';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AgentEntity } from 'app/entities';

@ApiTags('Agent')
@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @ApiOperation({
    description: 'Create Agent',
  })
  @Post()
  create(@Body() data: AgentReq): Promise<AgentEntity> {
    return this.agentService.create(data);
  }

  @ApiOperation({
    description: 'Find all agents',
  })
  @Get()
  findAll(): Promise<AgentEntity[]> {
    return this.agentService.findAll();
  }
}
