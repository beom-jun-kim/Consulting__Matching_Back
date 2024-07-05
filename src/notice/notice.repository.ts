/*eslint-disable */

import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Notice } from './notice.entity';
import { CreateNoticeDto } from './dto/createNotice.dto';
import { UpdateNoticeDto } from './dto/updateNotice.dto';

import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  constructor(@InjectRepository(Notice) private dataSource: DataSource) {
    super(Notice, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }
  async getAll(): Promise<Notice[]> {
    return await this.find({
      where: { delete_yn: 'N' },
      order: { id: 'DESC' },
    });
  }

  async getOneById(id: number): Promise<Notice> {
    return await this.findOneBy({ id });
  }

  async createNotice(CreateNoticeDto: CreateNoticeDto): Promise<Notice> {
    const filePath = CreateNoticeDto.nopath;

    const notice = await this.save(CreateNoticeDto);
    return notice;
  }

  async updateNotice(
    id: number,
    UpdateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    await this.createQueryBuilder()
      .update(Notice)
      .set(UpdateNoticeDto)
      .where('id = :id', { id })
      .execute();

    return await this.findOneBy({ id });
  }

  async deleteNotice(id: number): Promise<Notice> {
    const notice = await this.findOneBy({ id });
    notice.delete_yn = 'Y';

    return await this.save(notice);
  }
}
