import { IsIn, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IssueStatus } from 'app/types';

export class IssueReq {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  user: string;
}

export class UpdateIssueReq extends PartialType(IssueReq) {
  @ApiProperty()
  @IsIn([IssueStatus.inProgress, IssueStatus.resolved])
  status: IssueStatus;
}
