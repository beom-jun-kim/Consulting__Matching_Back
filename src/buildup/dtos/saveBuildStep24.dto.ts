import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep24Dto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  who: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  whened: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  whereed: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  what: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  why: string;

  @IsString()
  @IsOptional()
  memo:string;
}
