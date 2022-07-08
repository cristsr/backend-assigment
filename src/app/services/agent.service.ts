import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentReq } from 'app/dto';
import { AgentEntity } from 'app/entities';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity)
    private agentRepository: Repository<AgentEntity>,
  ) {}

  create(data: AgentReq): Promise<AgentEntity> {
    return this.agentRepository.save(data);
  }

  findAll(): Promise<AgentEntity[]> {
    return this.agentRepository.find();
  }
}
