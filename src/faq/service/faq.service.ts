/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../faq.repository';
import { Faq } from '../faq.entity';
import { CreateFaqDto } from '../dto/create-faq.dto';

@Injectable()
export class FaqService {
    constructor(
        private faqRepository: FaqRepository
    ) {} 

    // 게시글 생성
    async createFaq(createFaqDto:CreateFaqDto):Promise<Faq>{
        return this.faqRepository.createFaq(createFaqDto);
    }

    // 게시글 전체 조회
    async getFaq(): Promise < Faq[] > {
        return this.faqRepository.getFaq();
    }

    // 게시글 id 조회
    async getFaqId(id:number): Promise < Faq > {
        return this.faqRepository.getFaqId(id);
    }

    // 게시글 수정
    async updateFaq(id:number, createFaqDto:CreateFaqDto): Promise<Faq> {
        return this.faqRepository.updateFaq(id,createFaqDto);
    }

    // 게시글 삭제
    async deleteFaq(id:number): Promise<Faq> {
        return this.faqRepository.deleteFaq(id);
    }
}
