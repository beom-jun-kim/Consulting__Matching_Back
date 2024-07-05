import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDTO {
  @ApiProperty({
    description: '현재는 사용되지 않는 dto입니다.',
    required: false,
  })
  type: string;
  @ApiProperty({
    description: '현재는 사용되지 않는 dto입니다.',
    required: false,
  })
  price: number;
}
