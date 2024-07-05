/* eslint-disable */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
export class CreateQnaDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  writer: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  answer: string;
}
