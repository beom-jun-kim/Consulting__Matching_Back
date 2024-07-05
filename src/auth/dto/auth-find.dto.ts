import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
export class AuthFindDto {
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
}
