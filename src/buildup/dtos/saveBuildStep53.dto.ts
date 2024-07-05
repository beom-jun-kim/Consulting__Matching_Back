import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep53Dto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  title: string;

  @IsString()
  @IsOptional()
  memo: string;
}
