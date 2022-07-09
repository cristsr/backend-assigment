import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'app/services';
import { UserEntity } from 'app/entities';
import { UserReq } from 'app/dto/user-request.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Create User',
  })
  @Post()
  create(@Body() data: UserReq): Promise<UserEntity> {
    return this.userService.create(data);
  }

  @ApiOperation({
    description: 'Find all users',
  })
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
