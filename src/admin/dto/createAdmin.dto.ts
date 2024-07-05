/* eslint-disable  */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: '관리자 계정 이메일',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: 'skybiz123!',
    description: '관리자 계정 패스워드',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: '관리자 계정 권한(admin,tester 등)',
    required: true,
  })
  @IsOptional()
  @IsString()
  role: string;
}
