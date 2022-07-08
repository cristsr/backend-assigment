import { Test, TestingModule } from '@nestjs/testing';
import { AgentController } from './agent.controller';
import { AgentService } from 'app/services';
import { AgentEntity } from 'app/entities';

describe('AgentController', () => {
  let controller: AgentController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AgentController],
      providers: [
        {
          provide: AgentService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AgentController>(AgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method', async () => {
    const agentService = module.get<AgentService>(AgentService);

    const serviceSpy = jest
      .spyOn(agentService, 'create')
      .mockReturnValue(Promise.resolve(new AgentEntity()));

    const result = await controller.create({
      name: 'test',
      email: 'test',
    });

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(AgentEntity);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call findAll method', async () => {
    const agentService = module.get<AgentService>(AgentService);

    const serviceSpy = jest
      .spyOn(agentService, 'findAll')
      .mockReturnValue(Promise.resolve([new AgentEntity()]));

    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(AgentEntity);
    expect(serviceSpy).toHaveBeenCalled();
  });
});
