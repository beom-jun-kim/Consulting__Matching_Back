import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep15Dto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  pain1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pain2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pain3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pain4: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  disadvantage1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  disadvantage2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  disadvantage3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  disadvantage4: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  cPoint: string;

  @IsString()
  @IsOptional()
  memo:string;
}
