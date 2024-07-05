import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep54Dto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  title: string;

  @IsString()
  @IsOptional()
  memo: string;
}
