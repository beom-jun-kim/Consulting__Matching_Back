import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRoadMapDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  viewQuery: string;
}
