import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateNoticeDto } from './../dto/createNotice.dto';
import { Notice } from '../notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeRepository } from '../notice.repository';
import { UpdateNoticeDto } from './../dto/updateNotice.dto';

import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { NoticeImg } from '../noticeImg.entity';
import { Repository } from 'typeorm';
@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private NoticeRepository: NoticeRepository,

    @InjectRepository(NoticeImg)
    private noticeImgRepository: Repository<NoticeImg>,
  ) {}

  async getAllNotice(): Promise<Notice[]> {
    try {
      return await this.NoticeRepository.getAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createNotice(CreateNoticeDto: CreateNoticeDto) {
    try {
      return await this.NoticeRepository.createNotice(CreateNoticeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getNoticeById(id: number): Promise<Notice> {
    try {
      return await this.NoticeRepository.getOneById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateNotice(
    id: number,
    UpdateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    try {
      return await this.NoticeRepository.updateNotice(id, UpdateNoticeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteNotice(id: number): Promise<Notice> {
    try {
      return await this.NoticeRepository.deleteNotice(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async uploadNotice(file: any): Promise<string> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });

    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);

    if (uploadResult) {
      const newImgUrl = `https://${bucketName}.s3.amazonaws.com/${uploadResult.Key}`;
      const notice = await this.NoticeRepository.findOne({
        order: { id: 'DESC' },
      });
      let noticeImg = await this.noticeImgRepository.findOne({
        where: { path: newImgUrl },
      });

      if (!noticeImg) {
        noticeImg = this.noticeImgRepository.create({
          noticeId: notice.id + 1,
          path: newImgUrl,
        });
      } else {
        noticeImg.path = newImgUrl;
      }

      await this.noticeImgRepository.save(noticeImg);
      return noticeImg.path;
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }

  async uploadToS3(
    s3: AWS.S3,
    file: any,
    bucketName: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    // S3 업로드 옵션 설정
    const uploadOptions = {
      Bucket: bucketName,
      Key: `what/${uuidv4()}`, // "what/" 폴더 내에 고유한 파일명으로 저장
      Body: file.buffer,
      ACL: 'public-read', // 필요한 권한을 설정합니다.
      ContentType: file.mimetype,
    };

    // S3에 파일을 업로드하고 그 결과를 반환합니다.
    return s3.upload(uploadOptions).promise();
  }
}
