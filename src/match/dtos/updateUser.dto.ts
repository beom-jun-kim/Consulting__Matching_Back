import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  phoneNum: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  gradePoint: number;

  @IsOptional()
  @IsNumber()
  gradeId: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  affiliationGroup: string;

  @IsOptional()
  @IsNumber()
  isEmailConfirmed: number;
}
