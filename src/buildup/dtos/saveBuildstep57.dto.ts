import { IsOptional, IsNumber, IsString } from 'class-validator';
export class SaveBuildStep57Dto {
  @IsOptional()
  @IsNumber()
  q1: number;

  @IsOptional()
  @IsNumber()
  q2: number;

  // update용 주석
  @IsOptional()
  @IsNumber()
  q3: number;

  @IsString()
  @IsOptional()
  memo:string;
}
