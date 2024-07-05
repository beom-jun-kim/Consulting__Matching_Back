import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep59Dto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  feedback1: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  feedback2: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  feedback3: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  feedback4: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  plan1: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  plan2: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  plan3: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  plan4: string;

  @IsString()
  @IsOptional()
  memo:string;
}
