/*eslint-disable*/
import { Module } from '@nestjs/common';
import { VideoService } from './service/video.service';
import { VideoController } from './controller/video.controller';
import { VideoRepository } from './video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Video])
  ],
  providers: [VideoService,VideoRepository],
  controllers: [VideoController]
})
export class VideoModule {}
