import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { MentoringAppController } from './controller/mentoringapp.controller';
import { MentoringAppService } from './service/mentoringapp.service';
import { MentoringApp } from './entities/mentoringapp.entity';
import { ChoiceTags } from './entities/choicetags.entity';
import { ConsultingJournal } from 'src/match/entities/consutingJournal.entity';

@Module({
  controllers: [MentoringAppController],
  providers: [MentoringAppService],
  imports: [TypeOrmModule.forFeature([MentoringApp, User, ChoiceTags])],
})
export class MentoringAppModule {}
