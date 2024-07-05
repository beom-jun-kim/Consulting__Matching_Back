import { IsOptional, IsString } from 'class-validator';

export class ChoiceTagsDto {
  @IsOptional()
  @IsString()
  tagName: string;
}
