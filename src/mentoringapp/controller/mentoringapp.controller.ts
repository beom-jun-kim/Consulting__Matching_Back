import {
  Body,
  Controller,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MentoringAppService } from '../service/mentoringapp.service';
import { ApiOperation } from '@nestjs/swagger';
import { MentoringAppDto } from '../dtos/mentoringApp.dto';
import { MentoringApp } from '../entities/mentoringapp.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

@Controller('api/mentoringapp')
export class MentoringAppController {
  constructor(private mentoringAppService: MentoringAppService) {}

  @ApiOperation({ summary: '멘티가 멘토링 신청서 작성' })
  @Post('/appCreate')
  @UsePipes(ValidationPipe)
  async createApplication(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<void> {
    // 셀프멘토링 : userId, buildId, title, isSelf
    // 멘토지정 : userId, mentoEmail, buildId, title, mentoringAt, tagName, place,bmTitle
    // 멘토미지정 : userId, buildId, title, mentoringAt, tagName, place,bmTitle
    return await this.mentoringAppService.createApplication(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티가 멘토링 신청서 수정' })
  @Post('/appUpdate')
  @UsePipes(ValidationPipe)
  async updateApplication(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<void> {
    // 멘토지정 : userId, mentoEmail, buildId, title, mentoringAt, tagName, place
    // 멘토미지정 : userId, buildId, title, mentoringAt, tagName, place
    return await this.mentoringAppService.updateApplication(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘토들이 보는 신청서 리스트' })
  @Post('/appGet')
  @UsePipes(ValidationPipe)
  async getApplication(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<{ data: MentoringApp[]; count: number }> {
    // 멘토 자기자신의 아이디,페이지번호,보여줄페이지개수(mentoId,pageNum,pageSize)
    return await this.mentoringAppService.getApplication(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘토정보 조회' })
  @Post('/loadMentoInfo')
  @UsePipes(ValidationPipe)
  async loadMentoInfo(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<{ AuthCredentialsDto }> {
    // 멘토 자기자신의 아이디,페이지번호,보여줄페이지개수(mentoId,pageNum,pageSize)
    return await this.mentoringAppService.loadMentoInfo(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티정보 조회' })
  @Post('/loadMenteeInfo')
  @UsePipes(ValidationPipe)
  async loadMenteeInfo(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<{ AuthCredentialsDto }> {
    // 멘토 자기자신의 아이디,페이지번호,보여줄페이지개수(mentoId,pageNum,pageSize)
    return await this.mentoringAppService.loadMenteeInfo(mentoringAppDto);
  }

  @ApiOperation({ summary: '신청서' })
  @Post('/application')
  @UsePipes(ValidationPipe)
  async application(@Body() mentoringAppDto: MentoringAppDto): Promise<void> {
    // 신청서아이디(appId)
    return await this.mentoringAppService.application(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘토들이 신청서를 보고 멘토링 신청' })
  @Put('/appPut')
  @UsePipes(ValidationPipe)
  async putApplication(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<void> {
    // 멘토아이디, 신청서아이디(mentoId, appId)
    return await this.mentoringAppService.putApplication(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘토들이 멘토링 신청취소' })
  @Put('/appCancelPut')
  @UsePipes(ValidationPipe)
  async putApplicationCancel(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<void> {
    // 멘토아이디, 신청서아이디(mentoId, appId)
    return await this.mentoringAppService.putApplicationCancel(mentoringAppDto);
  }
  @ApiOperation({ summary: '멘티가 보는 멘토링 신청내역' })
  @Post('/appList')
  @UsePipes(ValidationPipe)
  async appList(@Body() mentoringAppDto: MentoringAppDto): Promise<void> {
    // 멘티아이디(userId)
    return await this.mentoringAppService.appList(mentoringAppDto);
  }
  @ApiOperation({ summary: '멘티가 보는 멘토링 신청리스트' })
  @Post('/acceptGet')
  @UsePipes(ValidationPipe)
  async getAcceptList(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<MentoringApp[]> {
    // 멘티아이디(userId)
    return await this.mentoringAppService.getAcceptList(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티가 멘토 정보 확인' })
  @Post('/mentoInfoGet')
  @UsePipes(ValidationPipe)
  async getMentoInfo(@Body() mentoringAppDto: MentoringAppDto): Promise<any> {
    // 보려고하는 멘토아이디(mentoId)
    return await this.mentoringAppService.getMentoInfo(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티가 맘에 드는 멘토를 수락' })
  @Put('/acceptPut')
  @UsePipes(ValidationPipe)
  async putAccept(@Body() mentoringAppDto: MentoringAppDto): Promise<any> {
    // 멘티아이디, 멘토아이디, 신청서아이디(userId,mentoId,appId)
    return await this.mentoringAppService.putAccept(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘토가 보는 멘토링 내역 리스트' })
  @Post('/mentoringGet')
  @UsePipes(ValidationPipe)
  async getMentoring(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<{ data: MentoringApp[]; count: number }> {
    // 멘토아이디, 페이지번호, 보여줄페이지개수(mentoId,pageNum,pageSize)
    return await this.mentoringAppService.getMentoring(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘토가 멘토링을 완료' })
  @Post('/mentoringComplete')
  @UsePipes(ValidationPipe)
  async completeMentoring(
    @Body() mentoringAppDto: MentoringAppDto,
  ): Promise<any> {
    // 신청서아이디(appId)
    return await this.mentoringAppService.completeMentoring(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티가 멘토에 대한 후기 작성' })
  @Post('/reviewCreate')
  @UsePipes(ValidationPipe)
  async createReview(@Body() mentoringAppDto: MentoringAppDto): Promise<any> {
    // 신청서아이디, 후기작성하는 멘티아이디, 멘토아이디, 점수들, 후기내용(appId,userId,mentoId,score1,score2,score3,score4,score5,reviewText)
    return await this.mentoringAppService.createReview(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티가 멘토에 대한 후기 내용 조회' })
  @Post('/reviewInfo')
  @UsePipes(ValidationPipe)
  async reviewInfo(@Body() mentoringAppDto: MentoringAppDto): Promise<any> {
    // 신청서아이디
    return await this.mentoringAppService.reviewInfo(mentoringAppDto);
  }

  @ApiOperation({ summary: '멘티가 멘토에 대한 후기 내용 수정' })
  @Post('/updateReview')
  @UsePipes(ValidationPipe)
  async updateReview(@Body() mentoringAppDto: MentoringAppDto): Promise<any> {
    // 신청서아이디, 후기작성하는 멘티아이디, 멘토아이디, 점수들, 후기내용(appId,userId,mentoId,score1,score2,score3,score4,score5,reviewText)
    return await this.mentoringAppService.updateReview(mentoringAppDto);
  }
}
