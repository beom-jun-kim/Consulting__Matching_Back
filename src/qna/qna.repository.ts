/*eslint-disable*/
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from './qna.entity';
import { CreateQnaDto } from '../qna/dto/create-qna.dto';
import { User } from 'src/auth/user.entity';
import {
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
@EntityRepository(Qna)
export class QnaRepository extends Repository<Qna> {
  constructor(@InjectRepository(Qna) private dataSource: DataSource) {
    super(Qna, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }
  // 게시글 생성
  async createQna(id: number, createQnaDto: CreateQnaDto): Promise<Qna> {
    const { category, question, writer } = createQnaDto;

    const qnaId = await this.findOne({
      where: { id },
    });

    if (!qnaId) {
      const qna = this.create({
        userId: id,
        writer,
        category,
        question,
      });
      return this.save(qna);
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
  // 게시글 상세보기
  async getQnaId(id: number): Promise<Qna> {
    const found = await this.createQueryBuilder('qna')
      .leftJoinAndSelect('qna.user', 'user')
      .where('qna.id = :id', { id })
      .getOne();

    if (!found) {
      throw new NotFoundException(`Can't find Qna with userId ${id}`);
    }

    return found;
  }

  // 마이페이지에 내 정보와 내가 쓴 qna글 조인해서 가져오기
  async getUsrJoin(id: User): Promise<Qna[]> {
    const found = await this.createQueryBuilder('qna')
      .where('qna.userId = :userId', { userId: id })
      .andWhere('qna.delete_yn = :delete_yn', {
        delete_yn: 'N',
      })
      .orderBy('qna.id', 'DESC') // 'qna.'을 추가하여 정확한 필드를 참조합니다.
      .getMany();

    if (!found) {
      throw new NotFoundException(`Can't find Qna with userId ${id}`);
    }

    return found;
  }

  // 게시글 조회
  async getAllQna(): Promise<Qna[]> {
    return await this.createQueryBuilder('qna')
      .leftJoinAndSelect('qna.user', 'user')
      .where('qna.delete_yn = :delete_yn', { delete_yn: 'N' })
      .orderBy('qna.id', 'DESC')
      .getMany();
  }

  // 댓글달기 댓글수정
  async createComment(
    answerObject: { answer: string },
    id: number,
  ): Promise<Qna> {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Qna with id ${id}`);
    }
    const { answer } = answerObject; // 객체 디스트럭처링을 사용하여 answer 변수에 값 할당

    found.answer = answer;
    found.answer_at = new Date();
    await this.save(found);

    return found;
  }

  // 게시글 수정
  async updateQna(createQnaDto: CreateQnaDto, id: number): Promise<Qna> {
    const found = await this.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Qna with id ${id}`);
    }
    found.category = createQnaDto.category;
    found.question = createQnaDto.question;
    return this.save(found);
  }

  // 게시글 삭제
  async deleteQna(id: number): Promise<Qna> {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Qna with id ${id}`);
    }

    found.delete_yn = 'Y';
    await this.save(found);

    return found;
  }
  // 게시글 파일다운로드
  // async downloadFile(filename: string): Promise<Buffer> {
  //   try {
  //     AWS.config.update({
  //       accessKeyId: 'AKIASEB4FW67ZAW624GJ',
  //       secretAccessKey: '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',
  //       region: 'ap-northeast-2',
  //     });
  //     const s3 = new AWS.S3(); // S3 객체 초기화
  //     const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름

  //     const params = {
  //       Bucket: bucketName,
  //       Key: `what/${filename}`,
  //     };

  //     // S3.getObject 메서드를 Promise로 감싸서 사용
  //     const data = await s3.getObject(params).promise();

  //     // 파일 쓰기 대신 Buffer를 반환
  //     return data.Body as Buffer;
  //   } catch (error) {
  //     console.error('파일 다운로드 중 오류 발생:', error);
  //     throw new Error('파일 다운로드 중 오류 발생');
  //   }
  // }
}
