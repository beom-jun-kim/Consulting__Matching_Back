/*eslint-disable*/
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FaqService } from '../service/faq.service';
import { Faq } from '../faq.entity';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @ApiOperation({ summary: 'FAQ 생성' })
  @Post()
  @UsePipes(ValidationPipe)
  createFaq(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqService.createFaq(createFaqDto);
  }

  //전체 조회
  @ApiOperation({ summary: 'FAQ 전체 조회' })
  @Get()
  getFaq(): Promise<Faq[]> {
    return this.faqService.getFaq();
  }

  //id 조회
  @ApiOperation({ summary: 'FAQ 개별 조회' })
  @Get('/:id')
  getFaqId(@Param('id', ParseIntPipe) id: number): Promise<Faq> {
    return this.faqService.getFaqId(id);
  }

  // 게시글 수정
  @ApiOperation({ summary: 'FAQ 수정' })
  @Put('/:id/put')
  updateFaq(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFaqDto: CreateFaqDto,
  ): Promise<Faq> {
    return this.faqService.updateFaq(id, createFaqDto);
  }

  // 게시글 삭제
  @ApiOperation({ summary: 'FAQ 삭제' })
  @Put('/:id/delete')
  deleteFaq(@Param('id', ParseIntPipe) id: number): Promise<Faq> {
    return this.faqService.deleteFaq(id);
  }
}
