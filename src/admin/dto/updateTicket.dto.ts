import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDTO {
  @ApiProperty({
    description: '공지사항 업데이트 시간',
    required: false,
  })
  type: string;

  @ApiProperty({
    description: '공지사항 업데이트 시간',
    required: false,
  })
  price: number;
}
