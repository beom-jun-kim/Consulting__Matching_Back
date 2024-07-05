import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class ReviewDto {
  @IsNumber()
  @IsNotEmpty()
  appId: number;

  @IsNumber()
  @IsNotEmpty()
  score1: number;

  @IsNumber()
  @IsNotEmpty()
  score2: number;

  @IsNumber()
  @IsNotEmpty()
  score3: number;

  @IsNumber()
  @IsNotEmpty()
  score4: number;

  @IsNumber()
  @IsNotEmpty()
  score5: number;

  @IsOptional()
  @IsString()
  reviewText: string;
}
