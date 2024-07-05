import { IsOptional, IsString } from 'class-validator';

export class SaveBuildStep42Dto {
  @IsString()
  @IsOptional()
  memo: string;
}
