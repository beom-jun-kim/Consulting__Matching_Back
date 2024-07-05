import { ApiProperty } from '@nestjs/swagger';

export class PortOneCancleDto {
  // 포트원 거래 고유번호

  @ApiProperty({
    example: 'imp_123456789',
    description: '포트원 거래 고유번호',
    required: true,
  })
  imp_uid: string;

  // 주문번호
  @ApiProperty({
    example: 'merchant_123456789',
    description: '주문번호',
    required: true,
  })
  merchant_uid: string;

  // 취소 요청 금액
  @ApiProperty({
    example: 1000,
    description: '취소 요청 금액',
    required: true,
  })
  amount: number;

  // 부가세 지정
  @ApiProperty({
    example: 100,
    description: '부가세 지정',
    required: true,
  })
  vat_amount: number;

  // 현재시점의 취소 가능 잔액
  @ApiProperty({
    example: 1000,
    description: '현재시점의 취소 가능 잔액',
    required: true,
  })
  checksum: number;

  // 취소사유
  @ApiProperty({
    example: '포트원 취소',
    description: '취소사유',
    required: true,
  })
  reason: string;

  // 토큰
  @ApiProperty({
    example: 'access_token',
    description: '토큰',
    required: true,
  })
  token: string;
}
