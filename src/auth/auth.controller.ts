import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  Get,
  Put,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res,
  Query,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MailerService } from './mailer.service';
import { RolesGuard } from 'src/middleware/role.guard';
import { PaymentHistory } from './paymentHistory.entity';
import { Param } from '@nestjs/common';
import { CreatePaymentHistoryDto } from './dto/createPay.dto';
import { PortOneCancleDto } from './dto/cancle.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  //!
  // !==============================portOne 테스트 start===========================================
  @Post('/portOneTest')
  portOneTest() {
    return this.authService.getIamportToken();
  }

  @Get('/portOneTest/:imid/:token')
  portOneTestGet(
    @Param('token') token: string,
    @Param('imid') imid: string,
  ): Promise<any> {
    return this.authService.getHistory(token, imid);
  }

  @Post('/portOne/cancle')
  portOneCancle(@Body() portOneCancleDto: PortOneCancleDto) {
    return this.authService.cancelPortOne(portOneCancleDto);
  }

  @Get('/portOne/getAll/:id')
  portOneGetAll(@Param('id') user_id: number): Promise<any> {
    return this.authService.portOneGetAll(user_id);
  }
  // !=========================portOne 테스트 end================================================
  // todo:

  @ApiTags('유저 관련 API')
  @ApiOperation({
    summary: '회원 가입',
    description: '회원 가입을 진행합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  // @ApiTags('유저 관련 API')
  // @ApiOperation({
  //   summary: '이메일 인증',
  //   description: '이메일 인증을 진행합니다.',
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: '이메일 인증 성공',
  //   type: User,
  // })
  // @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  // @ApiResponse({ status: 500, description: '서버 내부 오류' })
  // @Get('/confirm')
  // async confirmEmail(
  //   @Query('email') email: string,
  //   @Query('code') code: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const result = await this.authService.confirmEmail(email, code);

  //   if (result.success) {
  //     // 인증 성공 시, 사용자를 특정 URL로 리디렉션
  //     res.redirect('https://bmds.co.kr/main/MemberLogin');
  //   } else {
  //     // 인증 실패 또는 기타 오류 처리
  //     res.redirect('https://bmds.co.kr/main/MemberLogin');
  //   }
  // }

  @ApiTags('유저 관련 API')
  @ApiOperation({
    summary: '로그인',
    description: '로그인을 진행합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
    @Req() req: Request,
  ): Promise<{ accessToken: string }> {
    const loginDevice = (req as any).clientIp;
    return this.authService.signIn(authLoginDto, loginDevice);
  }

  @ApiTags('관리자 전용 API')
  @ApiOperation({
    summary: '관리자 로그인',
    description: '관리자 로그인을 진행합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/adminSignin')
  adminSignIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
    @Req() req: Request,
  ): Promise<{ accessToken: string }> {
    const loginDevice = (req as any).clientIp;
    return this.authService.adminSignIn(authLoginDto, loginDevice);
  }

  // todo:=========================================================
  @ApiTags('유저 관련 API')
  @ApiOperation({
    summary: '아이디 찾기',
    description: '아이디를 찾습니다.',
  })
  @ApiResponse({
    status: 201,
    description: '아이디 찾기 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('/findEmail')
  findEmail(
    @Query('name') name: string,
    @Query('phoneNum') phoneNum: string,
  ): Promise<string> {
    return this.authService.findEmail(name, phoneNum);
  }

  @ApiTags('유저 관련 API')
  @ApiOperation({
    summary: '비밀번호 찾기',
    description: '비밀번호를 찾습니다.',
  })
  @ApiResponse({
    status: 201,
    description: '비밀번호 찾기 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get('/findPassword')
  findPassword(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('phoneNum') phoneNum: string,
  ): Promise<string> {
    return this.authService.findPassword(name, email, phoneNum);
  }
  // todo:=========================================================
  @ApiTags('관리자 전용 API')
  @ApiOperation({
    summary: '유저 목록 조회',
    description: '유저 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저 목록 조회 성공',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Get()
  @UseGuards(RolesGuard)
  getAll(): Promise<User[]> {
    return this.authService.getAll();
  }

  @ApiTags('관리자 전용 API')
  @ApiOperation({
    summary: '회원정보 조회',
    description: '회원정보를 조회합니다.',
  })
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.authService.getById(id);
  }

  @ApiOperation({
    summary: '회원 이름만 조회',
  })
  @Get('/name/:id')
  async getByIdForName(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.authService.getByIdForName(id);
  }

  @ApiOperation({
    summary: '회원정보 수정',
  })
  @Put('/:id/put')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.updateById(id, authCredentialsDto);
  }

  @ApiOperation({
    summary: '삭제',
  })
  @Put('/:id/delete')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.authService.deleteById(id);
  }

  @ApiOperation({
    summary: '이력서 업로드',
  })
  @Post('/upload/:id')
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
        if (file.mimetype !== 'application/pdf') {
          // PDF 파일이 아닌 경우 에러 반환
          return cb(
            new HttpException('Invalid file type', HttpStatus.BAD_REQUEST),
            false,
          );
        }
        // PDF 파일인 경우 파일 저장 허용
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file,
    @Param('id') id: number,
  ): Promise<User> {
    return await this.authService.updateResume(id, file.path);
    // 여기서 file 객체에는 업로드된 파일의 정보가 담겨 있습니다.
    // 파일을 처리하고 저장하는 로직을 추가할 수 있습니다.
  }

  @ApiOperation({ summary: '이력서 다운로드' })
  @Get('/download/:id')
  async downloadFile(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.downloadResume(id, res);
  }

  // todo: 결제내역 관련 api
  // @ApiOperation({ summary: '결제 이메일 조회' })
  // @Get('/payment/:email')
  // findByEmailPay(@Param('email') email: string): Promise<PaymentHistory[]> {
  //   return this.authService.findByEmailPay(email);
  // }

  // @ApiOperation({ summary: '결제 내역 개별 조회' })
  // @Get('/payment/detail/:id')
  // findByDetailPay(@Param('id') id: number): Promise<PaymentHistory> {
  //   return this.authService.findByDetailPay(id);
  // }

  @ApiOperation({ summary: '결제내역 생성' })
  @Post('/payment')
  createPay(
    @Body() CreatePaymentHistoryDto: CreatePaymentHistoryDto,
  ): Promise<PaymentHistory> {
    return this.authService.createPaymentHistory(CreatePaymentHistoryDto);
  }

  // @ApiOperation({ summary: '결제내역 수정' })
  // @Patch('/payment/:id')
  // updatePay(
  //   @Param('id') id: number,
  //   @Body() paymentHistoryData: Partial<PaymentHistory>,
  // ): Promise<PaymentHistory> {
  //   return this.authService.updatePaymentHistory(id, paymentHistoryData);
  // }

  // @ApiOperation({ summary: '결제내역 삭제' })
  // @Delete('/payment/:imp_uid')
  // deletePay(@Param('imp_uid') imp_uid: string): Promise<{ deleted: boolean }> {
  //   return this.authService.deletePaymentHistory(imp_uid);
  // }

  @ApiOperation({
    summary: '그룹 식별 코드 업데이트 API',
    description: '그룹 식별 코드를 업데이트합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '그룹코드가 성공적으로 업데이트됨',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/groupCode/:id')
  async updateGroupCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto,
  ): Promise<User> {
    const code = dto.codeName;
    return await this.authService.updateGroupCode(id, code);
  }

  @ApiOperation({
    summary: '슈퍼바이저의 멘티리스트 '
  })
  @ApiResponse({
    status: 201,
    description: '멘티리스트가 성공적으로 조회됨.',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/menteeListForSupervisor')
  async menteeListForSupervisor(
    @Body() dto: User,
  ): Promise<User> {
    console.log("1");
    return await this.authService.menteeListForSupervisor(dto);
  }

  @ApiOperation({
    summary: '슈퍼바이저의 멘토리스트 '
  })
  @ApiResponse({
    status: 201,
    description: '멘토리스트가 성공적으로 조회됨.',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/mentoListForSupervisor')
  async mentoListForSupervisor(
    @Body() dto: User,
  ): Promise<User> {
    return await this.authService.mentoListForSupervisor(dto);
  }

  @ApiOperation({
    summary: '비밀번호 초기화 '
  })
  @ApiResponse({
    status: 201,
    description: '비밀번호 초기화',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/initPassword')
  async initPassword(
    @Body() dto: User,
  ): Promise<void> {
    console.log("1");
    await this.authService.initPassword(dto);
  }

  @ApiOperation({
    summary: '사용여부 업데이트 '
  })
  @ApiResponse({
    status: 201,
    description: '사용여부 업데이트',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @Post('/updateUseYn')
  async updateUseYn(
    @Body() dto: User,
  ): Promise<void> {
    console.log("1");
    await this.authService.updateUseYn(dto);
  }
}