import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep55Dto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  groupName1: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  groupName2: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  groupName3: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  groupName4: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  groupCount1: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  groupCount2: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  groupCount3: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  groupCount4: string;

  @IsOptional()
  @IsString()
  customerChar1: string;

  @IsOptional()
  @IsString()
  customerChar2: string;

  @IsOptional()
  @IsString()
  customerChar3: string;

  @IsOptional()
  @IsString()
  customerChar4: string;

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

  @IsString()
  @IsOptional()
  memo:string;
}
