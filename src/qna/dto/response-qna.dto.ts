import { ApiProperty } from '@nestjs/swagger';

export class QnaResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  answer_at: Date;

  @ApiProperty()
  delete_yn: string;
}
