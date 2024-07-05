/*eslint-disable*/
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { VideoService } from '../service/video.service';
import { VideoCreateDto } from '../dto/video-create.dto';
import { Video } from '../video.entity';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
@Controller('api/video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  //비디오 넣기
  @Post()
  createVideo(@Body() videoCreateDto: VideoCreateDto): Promise<Video> {
    return this.videoService.createVideo(videoCreateDto);
  }

  //비디오 id 조회
  @Get('/:id')
  getVideo(@Param('id', ParseIntPipe) id: number): Promise<Video[]> {
    return this.videoService.getVideo(id);
  }

  //비디오 수정
  @Put('/:id/put')
  updateVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() videoCreateDto: VideoCreateDto,
  ): Promise<Video> {
    return this.videoService.updateVideo(id, videoCreateDto);
  }

  //비디오 삭제
  @Put('/:id/delete')
  deleteVideo(@Param('id', ParseIntPipe) id: number): Promise<Video> {
    return this.videoService.deleteVideo(id);
  }
}
