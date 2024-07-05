/* eslint-disable  */
import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'aws-sdk/clients/ec2';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  isNotEmpty,
} from 'class-validator';

export class supervisorDto {

  sCode: string;
  company: string;
  businessNum: string;
  representativeName: string;
  companyTel: string;
  faxTel: string;
  companyEmail: string;
  startDate: DateTime;
  endDate: DateTime;
  useYn: string;
  role: string;
  menteeCnt: number;
  mentorCnt: number;
  bmCnt: number;
  mentoringCnt: number;
  
}
