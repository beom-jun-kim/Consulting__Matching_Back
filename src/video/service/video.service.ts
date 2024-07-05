/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { VideoRepository } from '../video.repository';
import { VideoCreateDto } from '../dto/video-create.dto';
import { Video } from '../video.entity';

@Injectable()
export class VideoService {
    constructor(
        private videoRepository:VideoRepository
    ) {}

    //비디오 넣기
    async createVideo(videoCreateDto:VideoCreateDto):Promise<Video>{
        return this.videoRepository.createVideo(videoCreateDto);
    }

    //비디오 id 조회
    async getVideo(id:number):Promise<Video[]>{
        return this.videoRepository.getVideo(id);
    }

    //비디오 수정
    async updateVideo(id:number,videoCreateDto:VideoCreateDto):Promise<Video>{
        return this.videoRepository.updateVideo(id,videoCreateDto);
    }

    //비디오 삭제
    async deleteVideo(id:number):Promise<Video>{
        return this.videoRepository.deleteVideo(id);
    }
}
