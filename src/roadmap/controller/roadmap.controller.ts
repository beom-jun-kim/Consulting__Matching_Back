import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { RoadmapService } from '../service/roadmap.service';
import { UserRoadMapDto } from '../dtos/userRoadmap.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @ApiOperation({ summary: '로드맵 조회' })
  @Post('/list')
  async getRoadmapList(
    @Body() dto: UserRoadMapDto,
  ): Promise<{ category: string; total_amount: string; cnt: string }[]> {
    console.log(dto);
    return await this.roadmapService.getRoadmapList(dto);
  }

  @ApiOperation({ summary: 'Save multiImageUp' })
  @Post('/multiImageUp')
  @UseInterceptors(FilesInterceptor('files'))
  async multiImageUp(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('firstNumber') firstNumber: number,
    @Body('secondNumber') secondNumber: number,
  ) {
    return await this.roadmapService.multiImageUp(
      files,
      firstNumber,
      secondNumber,
    );
  }
}
