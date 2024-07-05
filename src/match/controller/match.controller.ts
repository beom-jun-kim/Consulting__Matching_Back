import {
  ArgumentMetadata,
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  ParseIntPipe,
  Patch,
  PipeTransform,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MatchService } from '../service/match.service';
import { ApiOperation } from '@nestjs/swagger';
import { SelectedTagDto } from '../dtos/selectedTag.dto';
import { TagList } from '../entities/tagList.entity';
import { Match } from '../entities/match.entity';
import { MatchDto } from '../dtos/match.dto';
import { User } from 'src/auth/user.entity';
import UpdateUserDto from '../dtos/updateUser.dto';
import { ConsultingJournal } from '../entities/consutingJournal.entity';
import { CreateJournalDto } from '../dtos/createJournal.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utills/imageFileFilter';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import ReviewDto from '../dtos/review.dto';
import { diskStorage } from 'multer';
import { Video } from 'src/video/video.entity';
import { MentoringApp } from 'src/mentoringapp/entities/mentoringapp.entity';
import { Supervisor } from 'src/auth/supervisor.entity';
class OptionalParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value === undefined ? value : parseInt(value, 10);
  }
}

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  /**
   * Selects tags for a specific ID.
   *
   * @param id - The ID of the ConsultantUser.
   * @param dtos - An array of SelectedTagDto objects.
   * @returns A Promise that resolves to void.
   */
  @ApiOperation({ summary: '컨설턴트가 전문 태그(분야로 바뀜) 입력' })
  @Post('/selectTag/:userId')
  @UsePipes(new ValidationPipe())
  async selectTag(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dtos: SelectedTagDto[],
  ): Promise<void> {
    return this.matchService.selectTag(userId, dtos);
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 전문 태그(분야로 바뀜) 조회' })
  @Get('/getTag/:id/:page?/:pageSize?')
  async getTag(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
  ): Promise<TagList[]> {
    return this.matchService.getTag(id, page, pageSize);
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 전문 태그(분야로 바뀜) 삭제' })
  @Delete('/deleteTag/:id')
  async deleteTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.matchService.deleteTag(id);
  }

  @ApiOperation({ summary: '컨설턴트 단일 조회' })
  @Get('/getConsultant/:id')
  async getConsultant(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.matchService.getConsultant(id);
  }

  @ApiOperation({
    summary: '유저가 전문 태그(분야로 바뀜) 필터링하여 컨설턴트 조회',
  })
  @Get('/getConsultantByTag/:userId/:page?/:pageSize?')
  @UsePipes(new ValidationPipe())
  async getConsultantByTag(
    @Param('userId', ParseIntPipe) id: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
    @Query('tags') tags?: string[],
  ): Promise<User[]> {
    return this.matchService.getConsultantByTag(id, page, pageSize, tags);
  }

  @ApiOperation({ summary: '유저가 컨설턴트에게 매칭 요청' })
  @Post('/requestMatch')
  @UsePipes(new ValidationPipe())
  async requestMatch(@Body() dto: MatchDto): Promise<Match> {
    return this.matchService.requestMatch(dto);
  }

  @ApiOperation({ summary: '유저가 컨설턴트에게 매칭 요청 취소' })
  @Delete('/cancelMatch/:id/:generalUserId/:consultantUserId/:buildId')
  @UsePipes(new ValidationPipe())
  async cancelMatch(
    @Param('id', ParseIntPipe) id: number,
    @Param('generalUserId', ParseIntPipe) generalUserId: number,
    @Param('consultantUserId', ParseIntPipe) consultantUserId: number,
    @Param('buildId', ParseIntPipe) buildId: number,
  ): Promise<void> {
    return this.matchService.cancelMatch(
      id,
      generalUserId,
      consultantUserId,
      buildId,
    );
  }

  @ApiOperation({ summary: '매칭 거절 (컨설턴트가 유저에게)' })
  @Post('/rejectMatch')
  @UsePipes(new ValidationPipe())
  async rejectMatch(@Body() dto: MatchDto): Promise<Match> {
    return this.matchService.rejectMatch(dto);
  }

  @ApiOperation({ summary: '매칭 수락 (컨설턴트가 유저에게)' })
  @Post('/acceptMatch')
  @UsePipes(new ValidationPipe())
  async acceptMatch(@Body() dto: MatchDto): Promise<Match> {
    return this.matchService.acceptMatch(dto);
  }

  @ApiOperation({ summary: '매칭 완료 (컨설턴트가 유저에게)' })
  @Post('/completeMatch')
  @UsePipes(new ValidationPipe())
  async completeMatch(@Body() dto: MatchDto): Promise<Match> {
    return this.matchService.completeMatch(dto);
  }

  @ApiOperation({ summary: '컨설팅 완료 (컨설턴트가 유저에게)' })
  @Post('/completeConsulting')
  @UsePipes(new ValidationPipe())
  async completeConsulting(@Body() dto: MatchDto): Promise<Match> {
    return this.matchService.completeConsulting(dto);
  }

  @ApiOperation({ summary: '매칭 정보 조회 (유저가)' })
  @Get('/getMatch/:id/:page?/:pageSize?')
  async getMatch(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
  ): Promise<{ data: Match[]; count: number }> {
    return this.matchService.getMatch(id, page, pageSize);
  }

  @ApiOperation({ summary: '매칭 정보 조회 (전체)(관리자급)' })
  @Get('/getAllMatchAdmin/:id/:page?/:pageSize?')
  async getAllMatchAdmin(
    @Param('id', ParseIntPipe) id?: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
  ): Promise<Match[]> {
    return this.matchService.getAllMatchAdmin(id, page, pageSize);
  }

  @ApiOperation({ summary: '매칭 정보 조회 (전체)(슈퍼바이저)' })
  @Get('/getAllMatchSupervisor/:id/:page?/:pageSize?')
  async getAllMatchSupervisor(
    @Param('id', ParseIntPipe) id?: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
  ): Promise<Match[]> {
    return this.matchService.getAllMatchSupervisor(id, page, pageSize);
  }

  // @ApiOperation({ summary: '유저 리스트 조회 (슈퍼바이저들)' })
  // @Get('/getUserList/:role?/:page?/:pageSize?')
  // async getUserList(
  //   @Param('page', OptionalParseIntPipe) page = 1,
  //   @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
  //   @Param('role') role?: string,
  // ): Promise<User[]> {
  //   return this.matchService.getUserList(
  //     page,
  //     pageSize,
  //     role,
  //   );
  // }

  @ApiOperation({ summary: '유저 리스트 조회 (관리자만)' })
  @Get('/getUserListByAdmin/:id/:page?/:pageSize?/:role?')
  async getUserListByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
    @Param('role') role?: string,
  ): Promise<{ data: User[]; count: number }> {
    return this.matchService.getUserListByAdmin(id, page, pageSize, role);
  }

  @ApiOperation({ summary: '유저 리스트 조회 (슈퍼바이저)' })
  @Get('/getUserListBySupervisor/:id/:page?/:pageSize?/:role?')
  async getUserListBySupervisor(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
    @Param('role') role?: string,
  ): Promise<{ data: User[]; count: number }> {
    return this.matchService.getUserListBySupervisor(id, page, pageSize, role);
  }

  @ApiOperation({ summary: '유저 정보 수정 (관리자급만)' })
  @Patch('/updateUser/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.matchService.updateUser(id, dto);
  }

  @ApiOperation({ summary: '단일 유저 정보 조회 (관리자)' })
  @Get('/getUserDetailByAdmin/:id/:userId')
  async getUserDetailByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User> {
    return this.matchService.getUserDetailByAdmin(id, userId);
  }

  @ApiOperation({ summary: '단일 유저 정보 조회 (슈퍼바이저)' })
  @Get('/getUserDetailBySuperVisor/:id/:userId')
  async getUserDetailBySuperVisor(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User> {
    return this.matchService.getUserDetailBySuperVisor(id, userId);
  }

  @ApiOperation({ summary: '유저 정보 삭제 (관리자급만)' })
  @Delete('/deleteUser/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.matchService.deleteUser(id);
  }

  @ApiOperation({ summary: '유저 정보 복구 (관리자급만)' })
  @Post('/restoreUser/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.matchService.restoreUser(id);
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 매칭 정보 조회' })
  @Get('/getConsultantMatch/:id/:page?/:pageSize?')
  async getConsultantMatch(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', OptionalParseIntPipe) page = 1,
    @Param('pageSize', OptionalParseIntPipe) pageSize = 10,
  ): Promise<Match[]> {
    return this.matchService.getConsultantMatch(id, page, pageSize);
  }

  /**
   * Retrieves the matched user for a consultant.
   *
   * @param id - The ID of the match.
   * @returns A Promise that resolves to the matched user.
   */
  @ApiOperation({
    summary: '컨설턴트가 자신의 매칭 정보에서 유저 단일 정보 조회',
  })
  @Get('/getConsultantMatchUser/:id')
  async getConsultantMatchUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.matchService.getConsultantMatchUser(id);
  }

  @ApiOperation({ summary: '컨설턴트가 자신과 매칭된 유저의 bmds 조회' })
  @Get('/getConsultantMatchBmds/:id')
  async getConsultantMatchBmds(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildUpBmds[]> {
    return this.matchService.getConsultantMatchBmds(id);
  }

  @ApiOperation({ summary: '컨설턴트가 일지작성시에 매칭된 bmds정보 조회' })
  @Get('/getConsultantMatchBmdsForJournal/:id')
  async getConsultantMatchBmdsForJournal(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Match[]> {
    return this.matchService.getConsultantMatchBmdsByJournal(id);
  }

  @ApiOperation({
    summary: '컨설턴트가 일지작성시에 매칭된 bmds정보 단일 조회',
  })
  @Get('/getConsultantMatchBmdsForJournalOne/:id/:buildId')
  async getConsultantMatchBmdsForJournalOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('buildId', ParseIntPipe) buildId: number,
  ): Promise<Match[]> {
    return this.matchService.getConsultantMatchBmdsByJournalOne(id, buildId);
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 매칭 상대에게 컨설팅 일지 작성' })
  @Post('/create/ConsultingJournal/:id')
  @UsePipes(new ValidationPipe())
  // @UseInterceptors(FilesInterceptor('files'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 2 },
      { name: 'textFile', maxCount: 1 },
    ]),
  )
  async createConsultingJournal(
    @Param('id', ParseIntPipe) id: number,
    // @UploadedFiles() files: Array<Express.Multer.File | null>,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; textFile?: Express.Multer.File },
    @Body() dto: CreateJournalDto,
  ): Promise<ConsultingJournal> {
    
    const images = files.images;
    const textFile = files.textFile;
    
    return this.matchService.createJournal(id, dto, textFile, images);
  }

  @ApiOperation({ summary: '일지목록 조회' })
  @Post('/loadJournalList')
  async loadJournalList(
    @Body() dto: CreateJournalDto,
  ): Promise<{ data: ConsultingJournal[]; }> {

    return this.matchService.loadJournalList(dto);
    
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 컨설팅 일지 조회' })
  @Get('/getConsultingJournal/:id/:currentPage?/:page?')
  async getConsultingJournal(
    @Param('id', ParseIntPipe) id: number,
    @Param('currentPage', OptionalParseIntPipe) currentPage = 1,
    @Param('page', OptionalParseIntPipe) page = 10,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {

    return this.matchService.getConsultingJournal(id, currentPage, page);
    
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 컨설팅 일지 단일 조회' })
  @Get('/getConsultingJournal/detail/:id/:journalId')
  async getConsultingJournalById(
    @Param('id', ParseIntPipe) id: number,
    @Param('journalId', ParseIntPipe) journalId: number,
  ): Promise<ConsultingJournal> {
    return this.matchService.getConsultingJournalById(id, journalId);
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 컨설팅 일지 수정' })
  @Post('/updateConsultingJournal/:id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 2 },
      { name: 'textFile', maxCount: 1 },
    ]),
  )
  async updateConsultingJournal(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; textFile?: Express.Multer.File },
    @Body() dto: CreateJournalDto,
  ): Promise<ConsultingJournal> {
    
    const images = files.images;
    const textFile = files.textFile;

    return this.matchService.updateConsultingJournal(id, dto, textFile, images);
  }

  @ApiOperation({ summary: '컨설턴트가 자신의 컨설팅 일지 삭제' })
  @Delete('/deleteConsultingJournal/:id')
  async deleteConsultingJournal(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConsultingJournal> {
    return this.matchService.deleteConsultingJournal(id);
  }

  @ApiOperation({
    summary:
      '컨설턴트가 특정 유저와 매칭된 다른 컨설턴트가 작성한 컨설팅 일지의 summary 조회',
  })
  @Get('/getConsultingJournalSummary/:id/:buildId')
  async getConsultingJournalSummary(
    @Param('id', ParseIntPipe) id: number,
    @Param('buildId', ParseIntPipe) buildId: number,
  ): Promise<(ConsultingJournal | string)[]> {
    return this.matchService.getConsultingJournalSummary(id, buildId);
  }

  @ApiOperation({ summary: '유저가 자신의 bmds에 작성된 멘토링 일지 조회' })
  @Get('/getMentoringJournal/:id/:currentPage?/:page?')
  async getMentoringJournal(
    @Param('id', ParseIntPipe) id: number,
    @Param('currentPage', OptionalParseIntPipe) currentPage = 1,
    @Param('page', OptionalParseIntPipe) page = 10,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    return this.matchService.getMentoringJournal(id, currentPage, page);
  }

  @ApiOperation({
    summary: '유저가 자신의 bmds에 작성된 멘토링 일지 단일 조회',
  })
  @Get('/getMentoringJournalById/:id/:journalId')
  async getMentoringJournalById(
    @Param('id', ParseIntPipe) id: number,
    @Param('journalId', ParseIntPipe) journalId: number,
  ): Promise<ConsultingJournal> {
    return this.matchService.getMentoringJournalById(id, journalId);
  }

  @ApiOperation({
    summary: '슈퍼바이저 자신의 소속 컨설팅 내역 조회',
  })
  @Post('/consultingListForSupervisor')
  async consultingListForSupervisor(
    @Body() dto : MentoringApp,
  ): Promise<{ data: MentoringApp[];}> {
    console.log(dto);
    return this.matchService.consultingListForSupervisor(dto);
  }

  @ApiOperation({
    summary: '슈퍼바이저가 자신의 소속 컨설턴트들의 컨설팅 일지 조회',
  })
  @Get('/getConsultingJournalBySupervisor/:id/:currentPage?/:page?')
  async getConsultingJournalBySupervisor(
    @Param('id', ParseIntPipe) id: number,
    @Param('currentPage', OptionalParseIntPipe) currentPage = 1,
    @Param('page', OptionalParseIntPipe) page = 10,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    return this.matchService.getConsultingJournalBySupervisor(
      id,
      currentPage,
      page,
    );
  }

  @ApiOperation({
    summary: '일반 유저가 매칭된 컨설턴트에게 후기 작성',
  })
  @Post('/createReview')
  @UsePipes(new ValidationPipe())
  async createReview(
    @Body() dto: ReviewDto,
  ): Promise<void> {
    return this.matchService.createReview(dto);
  }

  @ApiOperation({
    summary: '컨설턴트를 제외한 유저들이 컨설턴트 후기 조회',
  })
  @Get('/getReview/:currentUserId/:consultantId/:currentPage?/:page?')
  async getReview(
    @Param('currentUserId', ParseIntPipe) currentUserId: number,
    @Param('consultantId', ParseIntPipe) consultantId: number,
    @Param('currentPage', OptionalParseIntPipe) currentPage = 1,
    @Param('page', OptionalParseIntPipe) page = 10,
  ): Promise<
    {
      id: number;
      userId: number;
      createdAt: string;
      score1: number;
      score2: number;
      score3: number;
      score4: number;
      score5: number;
      reviewUserName: string;
    }[]
  > {
    return this.matchService.getReview(
      currentUserId,
      consultantId,
      currentPage,
      page,
    );
  }

  @ApiOperation({
    summary: '슈퍼바이저가 자신의 소속 매칭 정보 단일 조회',
  })
  @Get('/getMatchDetailBySupervisor/:superVisorId/:matchId')
  async getMatchDetailBySupervisor(
    @Param('superVisorId', ParseIntPipe) id: number,
    @Param('matchId', ParseIntPipe) matchId: number,
  ): Promise<{
    data: {
      match: Match;
      review: any[];
      reviewCount: number;
      journalCount: number;
    };
  }> {
    return this.matchService.getMatchDetailBySupervisor(id, matchId);
  }

  @ApiOperation({
    summary: '컨설팅 일지 단일 조회',
  })
  @Get('/getJournalDetail/:journalId')
  async getConsultingJournalDetail(
    @Param('journalId', ParseIntPipe) journalId: number,
  ): Promise<ConsultingJournal> {
    return this.matchService.getConsultingJournalDetail(journalId);
  }

  @ApiOperation({
    summary: '컨설턴트가 특정 유저에게 작성한 일지 리스트 조회',
  })
  @Get('/getConsultantJournalList/:consultantId/:userId/:currentPage?/:page?')
  async getConsultantJournalList(
    @Param('consultantId', ParseIntPipe) consultantId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('currentPage', OptionalParseIntPipe) currentPage = 1,
    @Param('page', OptionalParseIntPipe) page = 10,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    return this.matchService.getConsultantJournalList(
      consultantId,
      userId,
      currentPage,
      page,
    );
  }

  @ApiOperation({
    summary: '컨설턴트가 일지 작성할 때 기본정보 조회',
  })
  @Get('/getConsultGeneralInfo/:matchId')
  async getConsultGeneralInfo(
    @Param('matchId', ParseIntPipe) matchId: number,
  ): Promise<Match> {
    return this.matchService.getConsultGeneralInfo(matchId);
  }

  @ApiOperation({ summary: 'BMDS 매뉴얼 업로드 후 다운로드' })
  @Post('/createManual/:id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  async createManual(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Video> {
    console.log('file', file);
    return this.matchService.createManual(id, file);
  }

  @ApiOperation({
    summary: 'BMDS 매뉴얼 조회',
  })
  @Get('/getManual/:id')
  async getManual(@Param('id', ParseIntPipe) id: number): Promise<Video> {
    return this.matchService.getManual(id);
  }
}
