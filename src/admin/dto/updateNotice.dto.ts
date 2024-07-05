import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoticeDto {
  @ApiProperty({
    description: '공지 카테고리',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: '공지 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '공지 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '스토어에 저장된 파일 경로',
    required: false,
  })
  @IsString()
  @IsOptional()
  nopath?: string;

  @ApiProperty({
    description: '공지사항 업데이트 시간',
    required: false,
  })
  updated_at: Date;
}
