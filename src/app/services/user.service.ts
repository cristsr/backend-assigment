import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentReq } from 'app/dto';
import { UserEntity } from 'app/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(data: AgentReq): Promise<UserEntity> {
    return this.userRepository.save(data);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
