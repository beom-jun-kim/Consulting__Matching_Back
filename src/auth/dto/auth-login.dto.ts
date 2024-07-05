/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class AuthLoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
