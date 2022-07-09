import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from 'testing/utils';
import { UserEntity } from 'app/entities';
import { UserService } from 'app/services';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: GenericRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method', async () => {
    const agentRepository: Repository<UserEntity> = module.get(
      getRepositoryToken(UserEntity),
    );

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'save')
      .mockReturnValue(Promise.resolve(new UserEntity()));

    const result = await service.create({
      name: 'test',
      email: 'test',
    });

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UserEntity);
    expect(agentRepositorySpy).toHaveBeenCalled();
  });

  it('should call findAll method', async () => {
    const agentRepository: Repository<UserEntity> = module.get(
      getRepositoryToken(UserEntity),
    );

    const agentRepositorySpy = jest
      .spyOn(agentRepository, 'find')
      .mockReturnValue(Promise.resolve([new UserEntity()]));

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(UserEntity);
    expect(agentRepositorySpy).toHaveBeenCalled();
  });
});
