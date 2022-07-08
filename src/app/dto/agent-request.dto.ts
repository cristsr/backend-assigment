import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AgentReq {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;
}
