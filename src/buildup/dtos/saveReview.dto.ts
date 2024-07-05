import { IsInt, IsString, IsOptional, MaxLength } from 'class-validator';

export class SaveReviewDto {
  @IsOptional()
  @IsInt()
  score?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  content?: string;
}
