/*eslint-disable*/
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NoticeService } from '../service/notice.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateNoticeDto } from '../dto/createNotice.dto';
import { Notice } from '../notice.entity';
import { UpdateNoticeDto } from '../dto/updateNotice.dto';

@Controller('api/notices')
export class NoticeController {
  constructor(private NoticeService: NoticeService) {}

  @ApiOperation({
    summary: '모든 공지 가져오기',
  })
  @Get()
  async getAllNotice(): Promise<Notice[]> {
    return await this.NoticeService.getAllNotice();
  }

  @ApiOperation({
    summary: 'id 조회로 공지 가져오기',
  })
  @Get('/:id')
  async getNoticeById(@Param('id') id: number): Promise<Notice> {
    return await this.NoticeService.getNoticeById(id);
  }

  @ApiOperation({
    summary: '공지 생성하기',
  })
  @Post()
  async createNotice(
    @Body() CreateNoticeDto: CreateNoticeDto,
  ): Promise<Notice> {
    return await this.NoticeService.createNotice(CreateNoticeDto);
  }

  @ApiOperation({
    summary: '공지 수정하기',
  })
  @Put('/:id')
  async updateNotice(
    @Param('id') id: number,
    @Body() UpdateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    return await this.NoticeService.updateNotice(id, UpdateNoticeDto);
  }

  @ApiOperation({
    summary: '공지 삭제하기',
  })
  @Put('/delete/:id')
  async deleteNotice(@Param('id') id: number): Promise<Notice> {
    return await this.NoticeService.deleteNotice(id);
  }
}
