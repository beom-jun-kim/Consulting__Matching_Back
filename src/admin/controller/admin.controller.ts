/* eslint-disable  */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { supervisorDto } from 'src/admin/dto/supervisor.dto';
import { CreateAdminDto } from '../dto/createAdmin.dto';
import { AdminService } from '../service/admin.service';
import { UserUpdateDto } from '../dto/userUpdate.dto';
import { CreateNoticeDto } from '../dto/createNotice.dto';
import { UpdateNoticeDto } from '../dto/updateNotice.dto';
import { Request, Response } from 'express';
import { Notice } from 'src/notice/notice.entity';
import { LoginHistory } from 'src/auth/history.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Qna } from 'src/qna/qna.entity';
import { CreateFaqDto } from 'src/faq/dto/create-faq.dto'; 
import { Faq } from 'src/faq/faq.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { CreateTicketDTO } from '../dto/createTicket.dto';
import { UpdateTicketDTO } from '../dto/updateTicket.dto';
import { diskStorage } from 'multer';
import { join } from 'path';
import { CreateQnaDto } from '../../qna/dto/create-qna.dto';
import { CouponService } from '../../coupon/service/coupon.service';
import { NoticeService } from './../../notice/service/notice.service';
import { MeraklPay } from 'src/coupon/entities/merakl_pay.entity';
import { UserInsertAdminDto } from '../dto/userInsertAdmin.dto';
import { BuildupService } from 'src/buildup/service/buildup.service';

@Controller('api/admin')
@ApiTags('관리자 전용 API')
export class AdminController {
  constructor(
    private adminService: AdminService,

    private readonly CouponService: CouponService,

    private readonly noticeService: NoticeService,

    private readonly buildUpService: BuildupService,
  ) {}

  // Todo: 관리자 생성 및 로그인
  @ApiOperation({
    summary: '관리자 생성 API',
    description: '관리자를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '관리자 계정이 성공적으로 생성됨',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 409, description: '이미 존재하는 사용자' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/adminSignup')
  adminSignUp(
    @Body(ValidationPipe) authCredentialsDto: CreateAdminDto,
  ): Promise<User> {
    return this.adminService.adminSignUp(authCredentialsDto);
  }

  @ApiOperation({
    summary: '관리자 로그인 API',
    description: '관리자 권한을 가진 계정으로 로그인한다.',
  })
  @ApiCreatedResponse({ description: '관리자 로그인 성공', type: User })
  @ApiResponse({ status: 401, description: '인증되지 않음' })
  @ApiResponse({ status: 403, description: '접근 권한 없음' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/adminSignin')
  adminSignIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
    @Req() req: Request,
  ): Promise<{ accessToken: string }> {
    const loginDevice = (req as any).clientIp;
    return this.adminService.adminSignIn(authLoginDto, loginDevice);
  }

  @ApiOperation({ summary: '슈퍼바이저 리스트 조회 (관리자만)' })
  @Post('/supervisorListByAdmin')
  async supervisorListByAdmin(@Body() dto : supervisorDto): Promise<{ supervisorDto: any }> {
    console.log(dto);
    return this.adminService.supervisorListByAdmin(dto);
  }

  @ApiOperation({ summary: '슈퍼바이저 조회 (관리자만)' })
  @Post('/supervisor')
  async supervisor(@Body() dto : supervisorDto): Promise<{ supervisorDto: any }> {
    return this.adminService.supervisor(dto);
  }

  @ApiOperation({ summary: '슈퍼바이저 등록' })
  @Post('/insertSupervisor')
  async insertSupervisor(@Body() dto : supervisorDto): Promise<void> {
    console.log(dto);
    this.adminService.insertSupervisor(dto);
  }

  @ApiOperation({ summary: '슈퍼바이저 수정' })
  @Post('/updateSupervisor')
  async updateSupervisor(@Body() dto : supervisorDto): Promise<void> {
    this.adminService.updateSupervisor(dto);
  }

  @ApiOperation({ summary: '슈퍼바이저 삭제' })
  @Post('/deleteSupervisor')
  async deleteSupervisor(@Body() dto : supervisorDto): Promise<void> {
    this.adminService.deleteSupervisor(dto);
  }

  


  // Todo: 유저 조회 및 수정,삭제
  // 유저 전체 조회
  @ApiOperation({
    summary: '전체 유저 목록 조회 API',
    description: '모든 유저를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저 목록을 성공적으로 조회함',
    type: [User],
  })
  @ApiResponse({ status: 401, description: '인증되지 않음' })
  @ApiResponse({ status: 403, description: '접근 권한 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('/user')
  getUserAll(): Promise<User[]> {
    return this.adminService.getAll();
  }

  // 유저 개별 조회
  @ApiOperation({
    summary: '유저 개별 조회 API',
    description: '유저의 id를 통해 개별 조회',
  })
  @ApiResponse({
    status: 200,
    description: '유저 조회 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 404, description: '유저를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('/user/:id')
  getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.adminService.getById(userId);
  }

  // 유저 정보 수정
  @ApiOperation({
    summary: '유저 정보 수정 API',
    description: '유저 정보를 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저 정보 수정 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 404, description: '유저를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Put('/user/update/:id')
  updateUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return this.adminService.updateById(userId, userUpdateDto);
  }






  // 유저 생성(관리자)
  @ApiOperation({
    summary: '관리자가 유저 생성API',
    description: '관리자가 유저를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '유저 생성 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/userInsert')
  userInsert(@Body() userInsertAdminDto: UserInsertAdminDto): Promise<User> {
    return this.adminService.userInsert(userInsertAdminDto);
  }

  // 유저 이력서 다운로드
  @ApiOperation({
    summary: '유저 이력서 다운로드 API',
    description: '유저의 이력서를 다운로드한다.',
  })
  @ApiResponse({
    status: 200,
    description: '이력서 다운로드 성공',
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 404, description: '이력서를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('user/download/:id')
  downloadUserResume(
    @Param('id', ParseIntPipe) userId: number,
    @Res() res: Response,
  ): Promise<any> {
    return this.adminService.downloadResume(userId, res);
  }

  // 유저 정보 삭제
  @ApiOperation({
    summary: '유저 정보 삭제 API',
    description: '유저 정보를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '유저 삭제 성공', type: User })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 404, description: '유저를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Put('/user/:id/delete')
  deleteUserById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.adminService.deleteById(userId);
  }

  // 로그인 이력 확인
  @ApiOperation({
    summary: '로그인 이력 조회 API',
    description: '로그인 이력을 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 이력 조회 성공',
    type: LoginHistory,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('user/loginHistory')
  getLoginHistory(): Promise<LoginHistory[]> {
    return this.adminService.getLoginHistory();
  }

  // Todo: 공지 CRUD====================================================
  @ApiOperation({
    summary: '모든 공지 조회 API',
    description: '모든 공지를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 공지 가져오기 성공',
    type: [Notice],
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('notice/')
  async getAllNotice(): Promise<Notice[]> {
    return await this.adminService.getAllNotice();
  }

  @ApiOperation({
    summary: '공지 단건 조회 API',
    description: '공지를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '공지 가져오기 성공',
    type: Notice,
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('notice/:id')
  async getNoticeById(@Param('id') id: number): Promise<Notice> {
    return await this.adminService.getNoticeById(id);
  }

  @ApiOperation({
    summary: '공지 생성 API',
    description: '공지를 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '공지 생성 성공',
    type: Notice,
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('notice/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const safeFilename = file.fieldname.replace(/[^a-z0-9]/gi, '_'); // 파일 이름에서 특수문자 제거
          cb(
            null,
            safeFilename +
              '-' +
              uniqueSuffix +
              '.' +
              file.mimetype.split('/')[1],
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        // 파일 형식 모두 허용
        cb(null, true);
      },
    }),
  )
  async createNotice(
    @Body() CreateNoticeDto: CreateNoticeDto,
    @UploadedFile() file, // file 객체에는 업로드된 파일에 대한 정보가 포함됩니다.
  ): Promise<Notice> {
    if (file) {
      CreateNoticeDto.nopath = file.path; // createNoticeDto 객체에 파일 정보를 추가합니다.
    }
    return await this.adminService.createNotice(CreateNoticeDto);
  }

  @ApiOperation({
    summary: '공지 에디터내의 이미지 처리 API',
    description: '에디터 내에서 이미지를 업로드합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '이미지 업로드 성공',
    type: Notice,
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('/notice/img')
  @UseInterceptors(FileInterceptor('file')) // 'file'은 프론트엔드에서 보내는 파일의 key입니다.
  async handleEditorImageUpload(
    @UploadedFile() file: Express.Multer.File,

    @Res() res: Response,
  ) {
    return await this.noticeService.uploadNotice(file);
  }

  @ApiOperation({
    summary: '공지 수정 API',
    description: '공지를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '공지 수정 성공',
    type: Notice,
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Put('notice/:id')
  async updateNotice(
    @Param('id') id: number,
    @Body() UpdateNoticeDto: UpdateNoticeDto,
    @UploadedFile() file: Express.Multer.File, // file 객체에는 업로드된 파일에 대한 정보가 포함됩니다.
  ): Promise<Notice> {
    if (file) {
      UpdateNoticeDto.nopath = file.path;
    }
    return await this.adminService.updateNotice(id, UpdateNoticeDto);
  }

  @ApiOperation({
    summary: '공지 삭제 API',
    description: '공지를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '공지 삭제 성공',
    type: Notice,
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Put('notice/delete/:id')
  async deleteNotice(@Param('id') id: number): Promise<Notice> {
    return await this.adminService.deleteNotice(id);
  }
  // Todo: QNA 조회 및 답변, 삭제
  // QNA 전체 조회
  @ApiOperation({
    summary: 'QnA 전체조회 API',
    description: '모든 QnA를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'QnA 조회 성공',
    type: [Qna],
  })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Get('/qna')
  async getAllQnA(): Promise<Qna[]> {
    return await this.adminService.getAllQnA();
  }

  // QNA 개별 조회
  @ApiOperation({
    summary: 'QnA 단건 조회 API',
    description: 'QnA를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: 'QnA 조회 성공', type: Qna })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Get('/qna/:id')
  async getQnA(@Param('id') id: number): Promise<Qna> {
    return await this.adminService.getQnA(id);
  }

  // QnA 생성하기
  @ApiOperation({ summary: 'QnA 생성 API', description: 'QnA를 생성합니다.' })
  @ApiResponse({ status: 201, description: 'QnA 생성 성공', type: Qna })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('/qna/:id')
  @UsePipes(ValidationPipe)
  // @UseInterceptors(FileInterceptor('file'))
  async createQnA(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQnaDto: CreateQnaDto,
    // @UploadedFile() file: Express.Multer.File,
  ): Promise<Qna> {
    return await this.adminService.createQnA(id, createQnaDto);
  }

  // QnA 삭제하기
  @ApiOperation({ summary: 'QnA 삭제 API', description: 'QnA를 삭제합니다.' })
  @ApiResponse({ status: 200, description: 'QnA 삭제 성공', type: Qna })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Put('/qna/delete/:id')
  async deleteQnA(@Param('id') id: number): Promise<Qna> {
    return await this.adminService.deleteQnA(id);
  }

  // 답변 달기
  @ApiOperation({
    summary: 'QnA 답변 API',
    description: 'QnA에 답변을 답니다.',
  })
  @ApiResponse({ status: 200, description: 'QnA 답변 성공', type: Qna })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Patch('qna/:id/answer')
  @UsePipes(ValidationPipe)
  createAnswer(
    @Body()
    answerObject: {
      answer: string;
    },
    @Param('id') id: number,
  ): Promise<Qna> {
    return this.adminService.createAnswer(answerObject, id);
  }
  // Todo: FAQ CRUD
  // FAQ 전체 조회
  @ApiOperation({
    summary: 'FAQ 전체 조회 API',
    description: '모든 FAQ를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: 'FAQ 조회 성공', type: [Faq] })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Get('/faq')
  getAllFaq(): Promise<Faq[]> {
    return this.adminService.getAllFaq();
  }

  // FAQ id 조회
  @ApiOperation({
    summary: 'FAQ 단건 조회 API',
    description: 'FAQ를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: 'FAQ 조회 성공', type: Faq })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Get('/faq/:id')
  getFaqId(@Param('id', ParseIntPipe) id: number): Promise<Faq> {
    return this.adminService.getFaqId(id);
  }

  // FAQ 생성
  @ApiOperation({ summary: 'FAQ 생성 API', description: 'FAQ를 생성합니다.' })
  @ApiResponse({ status: 201, description: 'FAQ 생성 성공', type: Faq })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('/faq')
  @UsePipes(ValidationPipe)
  createFaq(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.adminService.createFaq(createFaqDto);
  }

  // FAQ 수정
  @ApiOperation({ summary: 'FAQ 수정 API', description: 'FAQ를 수정합니다.' })
  @ApiResponse({ status: 200, description: 'FAQ 수정 성공', type: Faq })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Put('faq/:id/put')
  updateFaq(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFaqDto: CreateFaqDto,
  ): Promise<Faq> {
    return this.adminService.updateFaq(id, createFaqDto);
  }

  // FAQ 삭제
  @ApiOperation({ summary: 'FAQ 삭제 API', description: 'FAQ를 삭제합니다.' })
  @ApiResponse({ status: 200, description: 'FAQ 삭제 성공', type: Faq })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Put('faq/:id/delete')
  deleteFaq(@Param('id', ParseIntPipe) id: number): Promise<Faq> {
    return this.adminService.deleteFaq(id);
  }

  // 유저 BM 전체 조회
  @ApiOperation({
    summary: '유저 BM 목록 조회 API',
    description: '모든 유저 BM을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '유저 BM 조회 성공', type: [User] })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('/user/get/BMs')
  async getBMAll(): Promise<any> {
    return await this.buildUpService.getBMAll();
  }

  // Todo:========================================
  // ! 현재 사용되지 않는 API
  @ApiOperation({ summary: '쿠폰 전체 조회' })
  @Get('/coupon/bmds')
  async getAllcoupons(): Promise<MeraklPay[]> {
    return await this.CouponService.getAllcoupons();
  }

  // Todo:========================================
  // ! 현재 사용되지 않는 API
  // @ApiOperation({ summary: '슈퍼바이저가 멘티리스트조회' })
  // @Post('/supervisor/loadMenteeList')
  // async loadMenteeList(@Body() dto: User): Promise<MeraklPay[]> {
  //   return await this.CouponService.loadMenteeList(dto);
  // }

  // Todo: 이용권 CRUD
  // ! 현재 사용되지 않는 API
  // @ApiOperation({ summary: '이용권 생성 : 관리자 권한' })
  // @Post('/ticket')
  // async createTicket(
  //   @Body() CreateTicketDTO: CreateTicketDTO,
  // ): Promise<Ticket> {
  //   return await this.adminService.createTicket(CreateTicketDTO);
  // }

  // @ApiOperation({ summary: '이용권 조회 : 관리자 권한' })
  // @Get('/ticket')
  // async getTicket(): Promise<Ticket[]> {
  //   return await this.adminService.getTicket();
  // }

  // @ApiOperation({ summary: '이용권 수정 : 관리자 권한' })
  // @Put('/:id')
  // async updateTicket(
  //   @Param('id') id: number,
  //   @Body() UpdateTicketDTO: UpdateTicketDTO,
  // ): Promise<Ticket> {
  //   return await this.adminService.updateTicket(id, UpdateTicketDTO);
  // }

  // @ApiOperation({ summary: '이용권 삭제 : 관리자 권한' })
  // @Delete('/delete/:id')
  // async deleteTicket(@Param('id') id: number): Promise<Ticket> {
  //   return await this.adminService.deleteTicket(id);
  // }

  // ! 현재 사용되지 않는 API
  // Todo: bmds관리 - 러프한 버전
  // @ApiOperation({ summary: 'Bmds1 전체 조회 only 관리자' })
  // @Get('/bmds1')
  // findAllBmds1(): Promise<Bmds1[]> {
  //   return this.adminService.findAllBmds1();
  // }
  // Todo: 결제관리
  // @ApiOperation({ summary: '결제 내역 전체 조회' })
  // @Get('/payment/')
  // findAllPay(): Promise<PaymentHistory[]> {
  //   return this.adminService.findAllPay();
  // }

  // @Get('/tsts')
  // async tsts() {
  //   return await this.adminService.ststs();
  // }
}
