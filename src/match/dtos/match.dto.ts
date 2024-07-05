import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MatchDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  generalUserId: number;

  @IsNotEmpty()
  @IsNumber()
  consultantUserId: number;

  @IsNotEmpty()
  @IsNumber()
  buildId: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  categoryDetail?: string;
}
