import { IsOptional, IsString } from 'class-validator';

export class SaveBuildStep74Dto {
  @IsOptional()
  @IsString()
  goal1: string;

  @IsOptional()
  @IsString()
  goal2: string;

  @IsOptional()
  @IsString()
  goal3: string;

  @IsOptional()
  @IsString()
  activity1: string;

  @IsOptional()
  @IsString()
  activity2: string;

  @IsOptional()
  @IsString()
  activity3: string;

  @IsString()
  @IsOptional()
  memo:string;
}
