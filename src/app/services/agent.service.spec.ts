import { Test, TestingModule } from '@nestjs/testing';
import { AgentService } from './agent.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgentEntity } from 'app/entities';
import { GenericRepository } from 'testing/utils';
import { Repository } from 'typeorm';

describe('AgentService', () => {
  let service: AgentService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AgentService,
        {
          provide: getRepositoryToken(AgentEntity),
          useValue: GenericRepository,
        },
      ],
    }).compile();

    service = module.get<AgentService>(AgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method', async () => {
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'save')
      .mockReturnValue(Promise.resolve(new AgentEntity()));

    const result = await service.create({
      name: 'test',
      email: 'test',
    });

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(AgentEntity);
    expect(agentRepositorySpy).toHaveBeenCalled();
  });

  it('should call findAll method', async () => {
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'find')
      .mockReturnValue(Promise.resolve([new AgentEntity()]));

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(AgentEntity);
    expect(agentRepositorySpy).toHaveBeenCalled();
  });
});
