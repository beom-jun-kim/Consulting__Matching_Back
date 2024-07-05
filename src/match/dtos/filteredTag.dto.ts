import { IsOptional, IsString } from 'class-validator';

export class FilteredTagDto {
  @IsOptional()
  @IsString()
  tagName: string;
}
