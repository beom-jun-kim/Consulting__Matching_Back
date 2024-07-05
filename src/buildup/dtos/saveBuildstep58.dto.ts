import { IsOptional, IsNumber, IsString } from 'class-validator';
export class SaveBuildStep58Dto {
  @IsOptional()
  @IsNumber()
  q1: number;

  @IsOptional()
  @IsNumber()
  q2: number;

  @IsOptional()
  @IsNumber()
  q3: number;

  @IsString()
  @IsOptional()
  memo:string;
}
