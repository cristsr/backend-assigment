import { Test, TestingModule } from '@nestjs/testing';
import { IssueService } from './issue.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgentEntity, IssueEntity, UserEntity } from 'app/entities';
import { GenericRepository } from 'testing/utils';
import { Repository } from 'typeorm';
import { AgentStatus, IssueStatus } from 'app/types';
import { BadRequestException } from '@nestjs/common';

describe('IssueService', () => {
  let service: IssueService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        IssueService,
        {
          provide: getRepositoryToken(IssueEntity),
          useValue: GenericRepository,
        },
        {
          provide: getRepositoryToken(AgentEntity),
          useValue: GenericRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: GenericRepository,
        },
      ],
    }).compile();

    service = module.get<IssueService>(IssueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with null agent', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'findOne')
      .mockReturnValue(Promise.resolve(null));

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'save')
      .mockReturnValue(Promise.resolve(new IssueEntity()));

    const result = await service.create({
      description: 'test',
      title: 'test',
      user: 1,
    });

    expect(result).toBeDefined();
    expect(agentRepositorySpy).toHaveBeenCalled();
    expect(issueRepositorySpy).toHaveBeenCalled();
  });

  it('should call create method with agent', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'findOne')
      .mockReturnValue(Promise.resolve(new AgentEntity()));

    const agentRepositorySpy2 = jest
      .spyOn(agentRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'save')
      .mockReturnValue(Promise.resolve(new IssueEntity()));

    const issueRepositorySpy2 = jest
      .spyOn(issueRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const result = await service.create({
      description: 'test',
      title: 'test',
      user: 1,
    });

    expect(result).toBeDefined();
    expect(agentRepositorySpy).toHaveBeenCalled();
    expect(agentRepositorySpy2).toHaveBeenCalled();
    expect(issueRepositorySpy).toHaveBeenCalled();
    expect(issueRepositorySpy2).toHaveBeenCalled();
  });

  it('should call findAll method', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'find')
      .mockReturnValue(Promise.resolve([new IssueEntity()]));

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(issueRepositorySpy).toHaveBeenCalled();
  });

  it('should call findByAgent method', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'find')
      .mockReturnValue(Promise.resolve([new IssueEntity()]));

    const result = await service.findByAgent(1);

    expect(result).toBeDefined();
    expect(issueRepositorySpy).toHaveBeenCalled();
  });

  it('should call findByUser method', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );

    const issueEntity = new IssueEntity();
    issueEntity.user = new UserEntity();

    const agentEntity = new AgentEntity();
    agentEntity.id = 1;
    agentEntity.status = AgentStatus.free;

    issueEntity.agent = agentEntity;

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'find')
      .mockReturnValue(Promise.resolve([issueEntity]));

    const result = await service.findByUser(1);

    expect(result).toBeDefined();
    expect(issueRepositorySpy).toHaveBeenCalled();
  });

  it('should call update method and update status to in-progress', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(new IssueEntity()));

    const issueRepositorySpy2 = jest
      .spyOn(issueRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(new AgentEntity()));

    const agentRepositorySpy2 = jest
      .spyOn(agentRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const result = await service.update(1, 1, {
      status: IssueStatus.inProgress,
    });

    expect(result).toEqual(void 0);
    expect(agentRepositorySpy).toHaveBeenCalled();
    expect(agentRepositorySpy2).toHaveBeenCalled();
    expect(issueRepositorySpy).toHaveBeenCalled();
    expect(issueRepositorySpy2).toHaveBeenCalled();
  });

  it('should call update method and prevent update resolved issues', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );

    const issueEntity = new IssueEntity();
    issueEntity.status = IssueStatus.resolved;

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(issueEntity));

    try {
      await service.update(1, 1, {
        status: IssueStatus.inProgress,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(issueRepositorySpy).toHaveBeenCalled();
    }
  });

  it('should call update method and prevent update issue with the same status given', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );

    const issueEntity = new IssueEntity();
    issueEntity.status = IssueStatus.inProgress;

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(issueEntity));

    const result = await service.update(1, 1, {
      status: IssueStatus.inProgress,
    });

    expect(result).toEqual(void 0);
    expect(issueRepositorySpy).toHaveBeenCalled();
  });

  it('should call update method and update status to resolved and assign new issue to agent', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(new IssueEntity()));

    const issueRepositorySpy2 = jest
      .spyOn(issueRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const issueRepositorySpy3 = jest
      .spyOn(issueRepository, 'findOne')
      .mockReturnValue(Promise.resolve(new IssueEntity()));

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(new AgentEntity()));

    const agentRepositorySpy2 = jest
      .spyOn(agentRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const result = await service.update(1, 1, {
      status: IssueStatus.resolved,
    });

    expect(result).toEqual(void 0);
    expect(agentRepositorySpy).toHaveBeenCalled();
    expect(agentRepositorySpy2).toHaveBeenCalled();
    expect(issueRepositorySpy).toHaveBeenCalled();
    expect(issueRepositorySpy2).toHaveBeenCalled();
    expect(issueRepositorySpy3).toHaveBeenCalled();
  });

  it('should call update method and update status to resolved and release agent', async () => {
    const issueRepository: Repository<IssueEntity> = module.get(
      getRepositoryToken(IssueEntity),
    );
    const agentRepository: Repository<AgentEntity> = module.get(
      getRepositoryToken(AgentEntity),
    );

    const issueRepositorySpy = jest
      .spyOn(issueRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(new IssueEntity()));

    const issueRepositorySpy2 = jest
      .spyOn(issueRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const issueRepositorySpy3 = jest
      .spyOn(issueRepository, 'findOne')
      .mockReturnValue(Promise.resolve(void 0));

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'findOneByOrFail')
      .mockReturnValue(Promise.resolve(new AgentEntity()));

    const agentRepositorySpy2 = jest
      .spyOn(agentRepository, 'update')
      .mockReturnValue(Promise.resolve(void 0));

    const result = await service.update(1, 1, {
      status: IssueStatus.resolved,
    });

    expect(result).toEqual(void 0);
    expect(agentRepositorySpy).toHaveBeenCalled();
    expect(agentRepositorySpy2).toHaveBeenCalled();
    expect(issueRepositorySpy).toHaveBeenCalled();
    expect(issueRepositorySpy2).toHaveBeenCalled();
    expect(issueRepositorySpy3).toHaveBeenCalled();
  });
});
