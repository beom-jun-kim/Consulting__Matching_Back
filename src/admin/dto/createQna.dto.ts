import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateQnaDto {
  @IsOptional()
  @ApiProperty({
    description: 'qna 카테고리',
    required: false,
  })
  category: string;

  @IsOptional()
  @ApiProperty({
    description: 'qna 질문(제목)',
    required: false,
  })
  question: string;

  @IsOptional()
  @ApiProperty({
    description: 'qna 내용',
    required: false,
  })
  content: string;

  @IsOptional()
  @ApiProperty({
    description: '작성자',
    required: false,
  })
  writer: string;
}
