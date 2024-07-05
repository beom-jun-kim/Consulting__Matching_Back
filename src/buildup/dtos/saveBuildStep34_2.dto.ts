import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep34_2Dto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  cause: string;

  @IsOptional()
  @IsString()
  definition: string;

  @IsString()
  @IsOptional()
  memo:string;
}
