import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep51Dto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  checkBool1: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  checkBool2: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  checkBool3: string;

  @IsString()
  @IsOptional()
  memo:string;
}
