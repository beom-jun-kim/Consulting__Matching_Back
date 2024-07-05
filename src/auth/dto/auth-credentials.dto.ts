/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  // @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  phoneNum: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  // @MinLength(3)
  @MaxLength(100)
  company: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  // @MinLength(3)
  @MaxLength(255)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9!@#$%^&*~]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

  @ApiProperty({ description: '이력서 파일', type: 'file', format: 'binary' })
  @IsOptional()
  @ValidateIf((o) => o.resume != null) //파일이 존재하는 경우에만 허용
  @MinLength(1, {
    message: 'Resume file is required.',
  })
  @MaxLength(10 * 1024 * 1024, {
    message: 'Resume file size should be less than 10MB.',
  })
  resume: any;

  @ApiProperty()
  @IsOptional()
  @MaxLength(6)
  @MinLength(6)
  confirmationCode: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // @MinLength(1)
  // @MaxLength(20)
  // gender: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  affiliationGroup: string;

  @ApiProperty()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsOptional()
  gradeId: string;

  @ApiProperty()
  @IsOptional()
  gradePoint: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsOptional()
  isMentor: string;

  @ApiProperty()
  @IsOptional()
  isEmailConfirmed: number;
}
