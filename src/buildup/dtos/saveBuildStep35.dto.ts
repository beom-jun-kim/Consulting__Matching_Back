import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep35Dto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  cause: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  direction: string;

  @IsOptional()
  @IsString()
  solution: string;

  @IsString()
  @IsOptional()
  memo:string;
}
