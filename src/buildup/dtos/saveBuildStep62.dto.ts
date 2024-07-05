import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep62Dto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  channel1: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  channel2: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  channel3: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  channel4: string;

  @IsOptional()
  @IsString()
  plan1: string;

  @IsOptional()
  @IsString()
  plan2: string;

  @IsOptional()
  @IsString()
  plan3: string;

  @IsOptional()
  @IsString()
  plan4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check5: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check6: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  check7: string;

  @IsString()
  @IsOptional()
  memo:string;
}
