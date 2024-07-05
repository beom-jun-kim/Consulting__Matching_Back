import { IsInt, IsString, IsOptional, IsNumber } from 'class-validator';

export class RoadMapDto {
  @IsOptional()
  @IsInt()
  career_int?: number;

  @IsOptional()
  @IsString()
  career1?: string;

  @IsOptional()
  @IsString()
  career2?: string;

  @IsOptional()
  @IsString()
  local1?: string;

  @IsOptional()
  @IsString()
  isfemale?: string;

  @IsOptional()
  @IsString()
  isBoy?: string;

  @IsOptional()
  @IsString()
  restartup?: string;

  @IsOptional()
  @IsString()
  pre?: string;

  @IsOptional()
  @IsString()
  detailarea_category?: string;

  @IsOptional()
  @IsString()
  detailarea?: string;

  @IsOptional()
  @IsNumber()
  isSocialed?: number;
}
