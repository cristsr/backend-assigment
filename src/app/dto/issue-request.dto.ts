import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IssueStatus } from 'app/types';

export class IssueReq {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  user: number;
}

export class UpdateIssueReq {
  @ApiProperty()
  @IsIn([IssueStatus.inProgress, IssueStatus.resolved])
  status: IssueStatus;
}

export class IssueQuery {
  @ApiProperty()
  @IsOptional()
  @IsEnum(IssueStatus)
  status: IssueStatus;
}
