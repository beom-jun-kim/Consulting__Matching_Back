import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep22Dto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  gender: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  age: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  inComeLevel: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  major: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  socialActivity: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  consumptionActivity: string;

  @IsString()
  @IsOptional()
  memo:string;
}
