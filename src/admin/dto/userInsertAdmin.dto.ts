/* eslint-disable  */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserInsertAdminDto {
  @ApiProperty({
    description: '관리자가 추가할 유저의 이메일',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

  @ApiProperty({
    description: '관리자가 추가할 유저의 이름',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: '관리자가 추가할 유저의 이메일',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: '관리자가 추가할 유저의 휴대폰 번호',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  phoneNum: string;

  @ApiProperty({
    description: '관리자가 추가할 유저의 회사',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  company: string;

  @ApiProperty({
    description: '관리자가 추가할 유저의 주소',
    required: false,
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    description: '관리자가 추가할 유저의 성별',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  gender: string;
}
