import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roadmap } from '../roadmap.entity';
import { MoreThan, Repository } from 'typeorm';
import { UserRoadMapDto } from '../dtos/userRoadmap.dto';
import { UserRoadmap } from '../userRoadmap.entity';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly roadmapRepository: Repository<Roadmap>,

    @InjectRepository(UserRoadmap)
    private readonly userRoadmapRepository: Repository<UserRoadmap>,
  ) {}

  async getRoadmapList(
    dto: UserRoadMapDto,
  ): Promise<{ category: string; total_amount: string; cnt: string }[]> {
    const query = dto.viewQuery;

    const result = await this.userRoadmapRepository.query(query);
    return result;
  }

  async uploadToS3(
    s3: AWS.S3,
    file: any,
    bucketName: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    // 파일명 인코딩: 한글 파일명을 안전하게 처리
    const encodedFileName = encodeURIComponent(file.originalname);
    console.log(encodedFileName);

    // S3 업로드 옵션 설정
    const uploadOptions = {
      Bucket: bucketName,
      Key: `${uuidv4()}_${encodedFileName}`,
      Body: file.buffer,
      ACL: 'public-read', // 필요한 권한을 설정합니다.
      ContentType: file.mimetype,
      // ContentDisposition: `attachment; filename="${file.originalname}"`,
    };
    // S3에 파일을 업로드하고 그 결과를 반환합니다.
    return s3.upload(uploadOptions).promise();
  }
  async multiImageUp(
    files: Express.Multer.File[],
    firstNumber: number,
    secondNumber: number,
  ): Promise<string[]> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름

    const uploadPromises = files.map(async (file) => {
      const uploadResult = await this.uploadToS3(s3, file, bucketName);
      if (uploadResult) {
        return `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      } else {
        throw new InternalServerErrorException(
          'S3에 이미지 업로드 중 오류 발생',
        );
      }
    });
    const uploadedUrls = await Promise.all(uploadPromises);

    const roadmapIds = Array.from(
      { length: Number(secondNumber) - Number(firstNumber) + 1 },
      (_, i) => Number(firstNumber) + i,
    );
    console.log('startId', firstNumber);
    console.log('endId', secondNumber);
    console.log('roadmapIds', roadmapIds);

    // Update the pathUrl for each Roadmap entity
    const updatePromises = roadmapIds.map(async (roadmapId, i) => {
      const roadmap = await this.roadmapRepository.findOne({
        where: { idx: roadmapId },
      });
      if (roadmap) {
        roadmap.pathUrl = uploadedUrls[i];
        return await this.roadmapRepository.save(roadmap);
      }
    });

    await Promise.all(updatePromises);

    return uploadedUrls;
  }
}
