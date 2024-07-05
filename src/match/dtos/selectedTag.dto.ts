import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SelectedTagDto {
  @IsNotEmpty()
  @IsString()
  tagName: string;

  @IsOptional()
  @IsString()
  tagDetail?: string;
}
