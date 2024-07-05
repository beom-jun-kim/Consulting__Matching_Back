import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  phoneNum: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  company: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  gender: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  role: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  gradeId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  gradePoint: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address: string;
}
