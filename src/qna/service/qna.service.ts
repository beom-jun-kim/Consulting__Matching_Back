/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { QnaRepository } from '../qna.repository';
import { CreateQnaDto } from '../dto/create-qna.dto';
import { Qna } from '../qna.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class QnaService {
  constructor(private qnaRepository: QnaRepository) {}

  // 게시글 생성
  async createQna(id: number, createQnaDto: CreateQnaDto): Promise<Qna> {
    return this.qnaRepository.createQna(id, createQnaDto);
  }

  // 게시글 상세보기
  async getQnaId(userId: number): Promise<Qna> {
    return this.qnaRepository.getQnaId(userId);
  }

  // 마이페이지에 내 정보와 내가 쓴 qna글 조인해서 가져오기
  async getUsrJoin(userId: User): Promise<Qna[]> {
    return this.qnaRepository.getUsrJoin(userId);
  }

  // 게시글 조회
  async getAllQna(): Promise<Qna[]> {
    return this.qnaRepository.getAllQna();
  }

  // 댓글달기 댓글수정
  async createComment(
    answerObject: { answer: string },
    id: number,
  ): Promise<Qna> {
    return this.qnaRepository.createComment(answerObject, id);
  }

  // 게시글 수정
  async updateQna(createQnaDto: CreateQnaDto, id: number): Promise<Qna> {
    return this.qnaRepository.updateQna(createQnaDto, id);
  }

  // 게시글 삭제
  async deleteQna(id: number): Promise<Qna> {
    return this.qnaRepository.deleteQna(id);
  }
  // 게시글 파일 다운로드
  // async downloadFile(filename: string): Promise<Buffer> {
  //   return this.qnaRepository.downloadFile(filename);
  // }
}
