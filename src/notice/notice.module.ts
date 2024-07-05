/*eslint-disable*/
import { Module } from '@nestjs/common';
import { NoticeController } from './controller/notice.controller';
import { NoticeService } from './service/notice.service';
import { NoticeRepository } from './notice.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { NoticeImg } from './noticeImg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notice, NoticeImg])],
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
})
export class NoticeModule {}
