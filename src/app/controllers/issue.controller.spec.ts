import { Test, TestingModule } from '@nestjs/testing';
import { IssueController } from './issue.controller';
import { IssueService } from 'app/services';
import { IssueEntity } from 'app/entities';
import { IssueStatus } from 'app/types';

describe('IssueController', () => {
  let module: TestingModule;

  let controller: IssueController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [
        {
          provide: IssueService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByAgent: jest.fn(),
            findByUser: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IssueController>(IssueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method', async () => {
    const entity = new IssueEntity();
    entity.id = 1;
    entity.status = IssueStatus.created;
    entity.title = 'test';
    entity.description = 'test';
    entity.user = { id: 1 } as any;

    const issueService = module.get(IssueService);

    const issueServiceSpy = jest
      .spyOn(issueService, 'create')
      .mockReturnValue(Promise.resolve(entity));

    const result = await controller.create({
      title: 'test',
      description: 'test',
      user: 1,
    });

    expect(result).toEqual(entity);
    expect(issueServiceSpy).toHaveBeenCalled();
  });

  it('should call getAll method', async () => {
    const entity = new IssueEntity();
    entity.id = 1;
    entity.status = IssueStatus.created;
    entity.title = 'test';
    entity.description = 'test';
    entity.user = { id: 1 } as any;

    const issueService = module.get(IssueService);

    const issueServiceSpy = jest
      .spyOn(issueService, 'findAll')
      .mockReturnValue(Promise.resolve([entity]));

    const result = await controller.findAll();

    expect(result).toEqual([entity]);
    expect(issueServiceSpy).toHaveBeenCalled();
  });

  it('should call findByAgent method', async () => {
    const entity = new IssueEntity();
    entity.id = 1;
    entity.status = IssueStatus.created;
    entity.title = 'test';
    entity.description = 'test';
    entity.user = { id: 1 } as any;

    const issueService = module.get(IssueService);

    const issueServiceSpy = jest
      .spyOn(issueService, 'findByAgent')
      .mockReturnValue(Promise.resolve([entity]));

    const result = await controller.findByAgent(1, { status: null });

    expect(result).toEqual([entity]);
    expect(issueServiceSpy).toHaveBeenCalled();
  });

  it('should call findByUser method', async () => {
    const entity = new IssueEntity();
    entity.id = 1;
    entity.status = IssueStatus.created;
    entity.title = 'test';
    entity.description = 'test';
    entity.user = { id: 1 } as any;

    const issueService = module.get(IssueService);

    const issueServiceSpy = jest
      .spyOn(issueService, 'findByUser')
      .mockReturnValue(Promise.resolve([entity]));

    const result = await controller.findByUser(1, { status: null });

    expect(result).toEqual([entity]);
    expect(issueServiceSpy).toHaveBeenCalled();
  });

  it('Should call update method', async () => {
    const issueService = module.get(IssueService);

    const issueServiceSpy = jest
      .spyOn(issueService, 'update')
      .mockReturnValue(Promise.resolve());

    const result = await controller.update(1, 1, {
      status: IssueStatus.inProgress,
    });

    expect(result).toEqual(void 0);
    expect(issueServiceSpy).toHaveBeenCalled();
  });
});
