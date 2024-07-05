import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep60Dto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  pathUrl: string;

  @IsString()
  @IsOptional()
  memo: string;
}
