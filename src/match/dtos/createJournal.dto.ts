import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateJournalDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  appId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  buildId: number;

  @IsNotEmpty()
  @Length(1, 50)
  mentorName: string;

  @IsNotEmpty()
  @Length(1, 100)
  mentorArea: string;

  @IsNotEmpty()
  @Length(1, 100)
  mentorGroup: string;

  @IsNotEmpty()
  @Length(1, 100)
  mentorRank: string;

  @IsNotEmpty()
  @Length(1, 50)
  menteeName: string;

  @IsNotEmpty()
  @Length(1, 20)
  menteeIsStartUp: string;

  @IsNotEmpty()
  @Length(1, 100)
  menteeCompany: string;

  @IsNotEmpty()
  @Length(1, 200)
  menteeItem: string;

  @IsNotEmpty()
  @Length(1, 20)
  degree: string;

  @IsOptional()
  @Type(() => Date)
  performanceDate: Date;

  @IsNotEmpty()
  @Length(1, 20)
  teachingMethod: string;

  @IsNotEmpty()
  @Length(1, 100)
  place: string;

  @IsOptional()
  @IsString()
  etc: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  benefit: string;

  @IsOptional()
  @IsString()
  evaluate: string;
}
