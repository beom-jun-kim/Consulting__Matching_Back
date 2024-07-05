import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep36Dto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  coreItem1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  coreItem2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  coreItem3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  coreItem4: string;

  @IsOptional()
  @IsString()
  corePoint1: string;

  @IsOptional()
  @IsString()
  corePoint2: string;

  @IsOptional()
  @IsString()
  corePoint3: string;

  @IsOptional()
  @IsString()
  corePoint4: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  highLow1: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  highLow2: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  highLow3: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  highLow4: string;

  // Additional properties
  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_5: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_6: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_7: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_8: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_9: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_10: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_11: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  step12_12: string;

  @IsOptional()
  otherOption: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  otherOptionText: string;
  
  @IsString()
  @IsOptional()
  memo:string;
}
