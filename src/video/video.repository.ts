/*eslint-disable*/
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { Video } from "./video.entity";
import { VideoCreateDto } from "./dto/video-create.dto";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
  constructor(@InjectRepository(Video) private dataSource: DataSource) {
    super(Video, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }

  // 비디오 넣기
  async createVideo(videoCreateDto:VideoCreateDto):Promise<Video>{
    const {title,description,file_path} = videoCreateDto;

    const video = this.create({
        title,description,file_path
    });

    await this.save(video);
    return video;
  }

  // 비디오 id 조회
  async getVideo(id:number):Promise<Video[]>{
    return await this.find({ where:{ id,delete_yn:'N'} });
  }

  // 비디오 수정
  async updateVideo(id:number,videoCreateDto:VideoCreateDto):Promise<Video>{
    const found = await this.findOneBy({ id });
  
      if (!found) {
        throw new NotFoundException(`Can't find Board with id ${id}`);
      }

      found.title = videoCreateDto.title;
      found.description = videoCreateDto.description;
      found.file_path = videoCreateDto.file_path;

      await this.save(found);
      return found;
  }

  // 비디오 삭제
  async deleteVideo(id:number):Promise<Video>{
    const found = await this.findOneBy({ id });
  
      if (!found) {
        throw new NotFoundException(`Can't find Board with id ${id}`);
      }

      found.delete_yn = 'Y';

      await this.save(found);
      return found;
  }

  
}