import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'app/services';
import { UserEntity } from 'app/entities';
import { UserController } from 'app/controllers';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method', async () => {
    const agentService = module.get<UserService>(UserService);

    const serviceSpy = jest
      .spyOn(agentService, 'create')
      .mockReturnValue(Promise.resolve(new UserEntity()));

    const result = await controller.create({
      name: 'test',
      email: 'test',
    });

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UserEntity);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call findAll method', async () => {
    const agentService = module.get<UserService>(UserService);

    const serviceSpy = jest
      .spyOn(agentService, 'findAll')
      .mockReturnValue(Promise.resolve([new UserEntity()]));

    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(UserEntity);
    expect(serviceSpy).toHaveBeenCalled();
  });
});
