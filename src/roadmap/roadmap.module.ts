import { Module } from '@nestjs/common';
import { RoadmapController } from './controller/roadmap.controller';
import { RoadmapService } from './service/roadmap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roadmap } from './roadmap.entity';
import { UserRoadmap } from './userRoadmap.entity';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService],
  imports: [TypeOrmModule.forFeature([Roadmap, UserRoadmap])],
})
export class RoadmapModule {}
