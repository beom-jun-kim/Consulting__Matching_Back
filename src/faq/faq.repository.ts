/*eslint-disable*/
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Faq } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Faq)
export class FaqRepository extends Repository<Faq> {
  constructor(@InjectRepository(Faq) private dataSource: DataSource) {
    super(Faq, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }
  //faq생성
  async createFaq(createFaqDto: CreateFaqDto): Promise<Faq> {
    const { category, question, answer } = createFaqDto;
    const faq = this.create({
      category,
      question,
      answer,
    });

    await this.save(faq);
    return faq;
  }

  //faq전체조회
  async getFaq(): Promise<Faq[]> {
    return await this.find({ where: { delete_yn: 'N' } });
  }

  //faq id조회
  async getFaqId(id: number): Promise<Faq> {
    const found = await this.findOneBy({
      id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  // 게시글 수정
  async updateFaq(id: number, createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = await this.findOneBy({
      id,
    });

    faq.category = createFaqDto.category;
    faq.question = createFaqDto.question;
    faq.answer = createFaqDto.answer;

    await this.save(faq);
    return faq;
  }

  // 게시글 삭제
  async deleteFaq(id: number): Promise<Faq> {
    const faq = await this.findOneBy({ id });

    faq.delete_yn = 'Y';

    await this.save(faq);
    return faq;
  }
}
