/* eslint-disable  */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentHistoryDto {
  @ApiProperty({
    description: '유저 아이디',
    required: true,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '결제 아이디',
    required: true,
  })
  @IsString()
  imp_uid: string;
}
