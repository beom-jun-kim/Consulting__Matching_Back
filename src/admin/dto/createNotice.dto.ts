import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNoticeDto {
  @ApiProperty({
    example: '공지',
    description: '공지 카테고리',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    example: '공지사항입니다.',
    description: '공지 제목',
    required: true,
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '공지 사항 입니다. 내용내용내용내용. 이상입니다.',
    description: '공지 내용',
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '공지관련 파일 경로',
    description: '스토어에 저장된 파일 경로',
    required: false,
  })
  @IsOptional()
  @IsString()
  nopath: string;
}
