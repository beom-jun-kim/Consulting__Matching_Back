import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class MentoringAppDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  appId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  mentoId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  buildId?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isSelf?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mentoEmail?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  place?: number;

  @ApiProperty()
  @Type(() => Date)
  @IsOptional()
  mentoringAt?: Date;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tagName?: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  score1?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  score2?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  score3?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  score4?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  score5?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reviewText?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pageSize?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pageNum?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bmTitle?: string;
}
