import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BootpayDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  receipt_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  order_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  order_name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status_locale: string;
}
