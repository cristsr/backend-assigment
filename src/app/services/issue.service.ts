import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IssueReq, UpdateIssueReq } from 'app/dto';
import { AgentEntity, IssueEntity, UserEntity } from 'app/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentStatus, IssueStatus } from 'app/types';
import { omit } from 'lodash';

@Injectable()
export class IssueService {
  #logger = new Logger(IssueService.name);

  constructor(
    @InjectRepository(IssueEntity)
    private issueRepository: Repository<IssueEntity>,

    @InjectRepository(AgentEntity)
    private agentRepository: Repository<AgentEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: IssueReq): Promise<IssueEntity> {
    // Find a free agent
    const agent = await this.agentRepository.findOne({
      where: {
        status: AgentStatus.free,
      },
    });

    // Create a new issue
    const issue = await this.issueRepository
      .save({
        ...data,
        user: data.user as any,
        agent,
        status: agent ? IssueStatus.inProgress : IssueStatus.created,
      })
      .then(async (issue) => {
        const user = await this.userRepository.findOneByOrFail({
          id: data.user,
        });

        return {
          ...issue,
          user,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });

    this.#logger.log(`Issue ${issue.id} created`);

    if (!agent) {
      this.#logger.log(`No free agents available`);
      return {
        ...issue,
        agent: issue.agent && omit(issue.agent, ['status']),
      } as IssueEntity;
    }

    this.#logger.log(`Assign issue ${issue.id} to agent ${agent.id}`);

    // Update the agent status
    await this.agentRepository.update(agent.id, {
      status: AgentStatus.busy,
    });

    return {
      ...issue,
      agent: issue.agent && omit(issue.agent, ['status']),
    } as IssueEntity;
  }

  async findAll() {
    const issues = await this.issueRepository.find({
      relations: ['agent', 'user'],
    });

    return issues.map((data) => ({
      ...data,
      agent: data.agent && omit(data.agent, ['status']),
    }));
  }

  findByAgent(agentId: number, status?: IssueStatus): Promise<IssueEntity[]> {
    return this.issueRepository.find({
      relations: ['user'],
      where: {
        agent: {
          id: agentId,
        },
        status,
      },
    });
  }

  async findByUser(
    userId: number,
    status?: IssueStatus,
  ): Promise<IssueEntity[]> {
    const issues = await this.issueRepository.find({
      relations: ['agent'],
      where: {
        user: {
          id: userId,
        },
        status,
      },
    });

    return issues.map(({ agent, ...data }) => ({
      ...data,
      agent: agent && omit(agent, ['status']),
    })) as IssueEntity[];
  }

  async update(
    issueId: number,
    agentId: number,
    data: UpdateIssueReq,
  ): Promise<void> {
    // Find the issue or throw an error
    const issue = await this.issueRepository
      .findOneByOrFail({
        id: issueId,
      })
      .catch((e) => {
        this.#logger.error(`Issue not found: ${issueId}`);
        throw new NotFoundException(e.message);
      });

    // Prevent update old issues and guarantee that one issue is in progress
    if (issue.status === IssueStatus.resolved) {
      // If the issue status is resolved, throw an error
      const msg = `Issue ${issueId} is already resolved`;
      this.#logger.error(msg);
      throw new BadRequestException(msg);
    }

    if (issue.status === data.status) {
      // If the issue status is the same as the new status, do nothing
      this.#logger.warn(`Issue ${issueId} is already ${data.status}`);
      return;
    }

    // Find the agent or throw an error
    const agent = await this.agentRepository
      .findOneByOrFail({
        id: agentId,
      })
      .catch((e) => {
        this.#logger.error(`Agent not found: ${agentId}`);
        throw new NotFoundException(e.message);
      });

    // Update the issue status
    await this.issueRepository.update(issueId, data);

    // If the issue status is resolved, try assign a new issue to the agent
    if (data.status === IssueStatus.resolved) {
      // Find created issue to assign agent
      const issue = await this.issueRepository.findOne({
        where: {
          status: IssueStatus.created,
        },
      });

      if (!issue) {
        // Release agent if no issues are available
        this.#logger.log(`No issues available, releasing agent ${agentId}`);

        await this.agentRepository.update(agentId, {
          status: AgentStatus.free,
        });

        return;
      }

      this.#logger.log(`Assign issue ${issue.id} to agent ${agentId}`);

      // Keep the agent busy and assign the issue to him
      await this.issueRepository.update(issue.id, {
        agent,
        status: IssueStatus.inProgress,
      });
    }
  }
}
