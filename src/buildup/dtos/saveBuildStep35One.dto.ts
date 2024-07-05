import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep35OneDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  cause1: string;

  @IsOptional()
  @IsString()
  cause2: string;

  @IsOptional()
  @IsString()
  cause3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction1_1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction1_2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction1_3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction2_1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction2_2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction2_3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction3_1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction3_2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction3_3: string;

  @IsOptional()
  @IsString()
  solution1_1: string;

  @IsOptional()
  @IsString()
  solution1_2: string;

  @IsOptional()
  @IsString()
  solution1_3: string;

  @IsOptional()
  @IsString()
  solution2_1: string;

  @IsOptional()
  @IsString()
  solution2_2: string;

  @IsOptional()
  @IsString()
  solution2_3: string;

  @IsOptional()
  @IsString()
  solution3_1: string;

  @IsOptional()
  @IsString()
  solution3_2: string;

  @IsOptional()
  @IsString()
  solution3_3: string;

  @IsString()
  @IsOptional()
  memo:string;
}
