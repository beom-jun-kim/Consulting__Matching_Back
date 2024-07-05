/*eslint-disable*/
import { Module } from '@nestjs/common';
import { FaqController } from './controller/faq.controller';
import { FaqService } from './service/faq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './faq.entity';
import { FaqRepository } from './faq.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Faq]),
  ],
  controllers: [FaqController],
  providers: [FaqService,FaqRepository]
})
export class FaqModule {}
