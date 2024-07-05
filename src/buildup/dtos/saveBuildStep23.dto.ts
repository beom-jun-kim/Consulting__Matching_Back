import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep23Dto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  category: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  detailCategory: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  scale: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logical: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  goal: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  selected: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  cycle: string;

  @IsString()
  @IsOptional()
  memo:string;
}
