import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IssueReq, UpdateIssueReq } from 'app/dto';
import { AgentEntity, IssueEntity } from 'app/entities';
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
  ) {}

  async create(data: IssueReq) {
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
        agent,
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });

    this.#logger.log(`Issue ${issue.id} created`);

    if (!agent) {
      this.#logger.log(`No free agents available`);
      return;
    }

    this.#logger.log(`Assign issue ${issue.id} to agent ${agent.id}`);

    // Update the agent status
    await this.agentRepository.update(agent.id, {
      status: AgentStatus.busy,
    });

    // Update the issue status
    await this.issueRepository.update(issue.id, {
      status: IssueStatus.inProgress,
    });
  }

  async findAll() {
    const issues = await this.issueRepository.find({
      relations: ['agent'],
    });

    return issues.map((data) => ({
      ...data,
      agent: omit(data.agent, ['status']),
    }));
  }

  findByAgent(agentId: number) {
    return this.issueRepository.find({
      where: {
        agent: {
          id: agentId,
        },
      },
    });
  }

  async update(issueId: number, agentId: number, data: UpdateIssueReq) {
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

    // Update the issue
    await this.issueRepository.update(issueId, data);

    if (data.status === 'resolved') {
      // Find issue to assign agent
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
