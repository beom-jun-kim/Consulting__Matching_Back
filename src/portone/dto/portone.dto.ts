import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PortoneDto {
  @ApiProperty()
  @IsString()
  merchantUid: string;

  @ApiProperty()
  @IsString()
  impUid: string;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNumber()
  productPrice: number;

  @ApiProperty()
  @IsNumber()
  subscribeMonthNum: number;

  @ApiProperty()
  @IsNumber()
  bmCreationNum: number;

  @ApiProperty()
  @IsString()
  buyerName: string;

  @ApiProperty()
  @IsString()
  buyerTel: string;

  @ApiProperty()
  @IsString()
  buyerEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;
}
