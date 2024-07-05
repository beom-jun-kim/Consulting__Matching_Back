import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep21Dto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  q1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  q2: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  qYear1: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  qYear2: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  qYear3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  qScale1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  qScale2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  qScale3: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  qYear4: string;

  @IsOptional()
  @IsNumber()
  qCagr: number;

  @IsString()
  @IsOptional()
  memo:string;
}
