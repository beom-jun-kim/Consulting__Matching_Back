/* eslint-disable  */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './../dto/createAdmin.dto';
import { User } from 'src/auth/user.entity';
import { UserRepository } from './../../auth/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import * as bcrypt from 'bcryptjs';
import { UserUpdateDto } from './../dto/userUpdate.dto';
import { supervisorDto } from 'src/admin/dto/supervisor.dto';
import { HistoryRepository } from '../history.repository';
import { LoginHistory } from 'src/auth/history.entity';
import { NoticeRepository } from './../../notice/notice.repository';
import { Notice } from 'src/notice/notice.entity';
import { CreateNoticeDto } from '../dto/createNotice.dto';
import { UpdateNoticeDto } from '../dto/updateNotice.dto';
import { Qna } from 'src/qna/qna.entity';
import { QnaRepository } from './../../qna/qna.repository';
import { CreateFaqDto } from '../../faq/dto/create-faq.dto';
import { Faq } from 'src/faq/faq.entity';
import { FaqRepository } from 'src/faq/faq.repository';
import { Ticket } from 'src/ticket/ticket.entity';
import { CreateTicketDTO } from '../dto/createTicket.dto';
import { UpdateTicketDTO } from '../dto/updateTicket.dto';
import { TicketRepository } from 'src/ticket/ticket.repository';
import { CreateQnaDto } from '../../qna/dto/create-qna.dto';
import { PaymentHistory } from 'src/auth/paymentHistory.entity';
import { PaymentHistoryRepository } from './../../auth/paymentHistory.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Contact } from '../contact.entity';
import { UserInsertAdminDto } from '../dto/userInsertAdmin.dto';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import { ValidationError } from 'class-validator';

@Injectable()
export class AdminService {
  constructor(
    private userRepository: UserRepository,
    private historyRepository: HistoryRepository,
    private jwtService: JwtService,
    private NoticeRepository: NoticeRepository,
    private QnaRepository: QnaRepository,
    private faqRepository: FaqRepository,
    private TicketRepository: TicketRepository,
    private phRepository: PaymentHistoryRepository,
    @InjectRepository(BuildUpBmds)
    private readonly buildUpBmdsRepository: Repository<BuildUpBmds>,
    // @InjectRepository(Contact)
    // private readonly contactRepository: Repository<Contact>,

    private readonly dataSource: DataSource,
  ) {}
  // Todo: 관리자 생성 및 로그인
  // 관리자 생성
  adminSignUp(CreateAdminDto: CreateAdminDto): Promise<User> {
    return this.userRepository.createAdmin(CreateAdminDto);
  }

  // 관리자 로그인
  async adminSignIn(
    authLoginDto: AuthLoginDto,
    loginDevice: string,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authLoginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user.role !== 'admin') {
      throw new UnauthorizedException('관리자 아님');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email, id: user.id, role: user.role };
      const accessToken = await this.jwtService.sign(payload);
      this.userRepository.saveLoginHistory(user, loginDevice);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

//* 슈퍼바이저 리스트 조회 (관리자)
async supervisorListByAdmin(dto : supervisorDto): Promise<{ supervisorDto: any }> {
    
  const supervisorList = await this.dataSource.query(
    `
    SELECT gc.*
    FROM GroupCode gc 
    WHERE 1 = 1
          AND deleteYn = 'N'      
    `
  );
  
  return supervisorList;
}

//* 슈퍼바이저 조회 (관리자)
async supervisor(dto : supervisorDto): Promise<{ supervisorDto: any }> {
    
  const supervisor = await this.dataSource.query(
    `
    SELECT gc.*
    FROM GroupCode gc 
    WHERE 1 = 1
          AND gc.sCode = ?
    `, [dto.sCode]
  );
  
  return supervisor;
}

//* 슈퍼바이저 등록
async insertSupervisor(dto : supervisorDto): Promise<void> {
  console.log(dto); 
  await this.dataSource.query(
    `
    INSERT INTO GroupCode (
          sCode
        , company
        , businessNum
        , representativeName
        , companyTel
        , faxTel
        , companyEmail
        , startDate
    ) values (
          ?
        , ?
        , ?
        , ?
        , ?
        , ?
        , ?
        , NOW()
    )`, 
    [ dto.sCode
    , dto.company
    , dto.businessNum
    , dto.representativeName
    , dto.companyTel
    , dto.faxTel
    , dto.companyEmail]
  );
}

//* 슈퍼바이저 수정
async updateSupervisor(dto : supervisorDto): Promise<void> {
    
  await this.dataSource.query(
    `
    UPDATE GroupCode
    SET company = ?
      , businessNum = ?
      , representativeName = ?
      , companyTel = ?
      , faxTel = ?
      , companyEmail = ?
      , startDate = ?
      , endDate = ?
    WHERE 1 = 1
        AND sCode = ?
    `, 
    [ dto.company
    , dto.businessNum
    , dto.representativeName
    , dto.companyTel
    , dto.faxTel
    , dto.companyEmail 
    , dto.startDate
    , dto.endDate
    , dto.sCode]
  );
}

//* 슈퍼바이저 수정
async deleteSupervisor(dto : supervisorDto): Promise<void> {
    
  await this.dataSource.query(
    `
    UPDATE GroupCode
    SET deleteYn = 'Y'
    WHERE 1 = 1
        AND sCode = ?
    `, 
    [dto.sCode]
  );
}

  // Todo: 유저 조회 및 수정,삭제
  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }
  async getAllBetaBmds(): Promise<User[]> {
    const user = await this.userRepository.find({ relations: ['betaBmdss'] });
    return user;
  }

  getById(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }

  updateById(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userRepository.adminUpdateById(id, userUpdateDto);
  }

  userInsert(userInsertAdminDto: UserInsertAdminDto): Promise<User> {
    return this.userRepository.userInsert(userInsertAdminDto);
  }

  deleteById(id: number): Promise<User> {
    return this.userRepository.deleteById(id);
  }
  downloadResume(id: number, res): Promise<any> {
    return this.userRepository.downloadResume(id, res);
  }

  getLoginHistory(): Promise<LoginHistory[]> {
    return this.historyRepository.getLoginHistory();
  }

  // Todo: 공지 CRUD
  async getAllNotice(): Promise<Notice[]> {
    try {
      return await this.NoticeRepository.getAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createNotice(CreateNoticeDto: CreateNoticeDto): Promise<Notice> {
    try {
      return await this.NoticeRepository.createNotice(CreateNoticeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getNoticeById(id: number): Promise<Notice> {
    try {
      return await this.NoticeRepository.getOneById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateNotice(
    id: number,
    UpdateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    try {
      return await this.NoticeRepository.updateNotice(id, UpdateNoticeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteNotice(id: number): Promise<Notice> {
    try {
      return await this.NoticeRepository.deleteNotice(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // Todo: QNA 조회 및 답변, 삭제
  // QnA 전체조회
  getAllQnA(): Promise<Qna[]> {
    return this.QnaRepository.getAllQna();
  }
  // QnA 개별조회
  getQnA(id: number): Promise<Qna> {
    return this.QnaRepository.getQnaId(id);
  }
  // QnA 생성하기
  createQnA(id: number, createQnaDto: CreateQnaDto): Promise<Qna> {
    return this.QnaRepository.createQna(id, createQnaDto);
  }
  // QnA 삭제하기
  deleteQnA(id: number): Promise<Qna> {
    return this.QnaRepository.deleteQna(id);
  }
  // Q&A 답변하기
  createAnswer(answerObject: { answer: string }, id: number): Promise<Qna> {
    return this.QnaRepository.createComment(answerObject, id);
  }
  // Todo: FAQ CRUD
  // 게시글 조회
  getAllFaq(): Promise<Faq[]> {
    return this.faqRepository.getFaq();
  }
  // 게시글 id 조회
  getFaqId(id: number): Promise<Faq> {
    return this.faqRepository.getFaqId(id);
  }

  // 게시글 생성
  createFaq(createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqRepository.createFaq(createFaqDto);
  }

  // 게시글 수정
  updateFaq(id: number, createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqRepository.updateFaq(id, createFaqDto);
  }

  // 게시글 삭제
  deleteFaq(id: number): Promise<Faq> {
    return this.faqRepository.deleteFaq(id);
  }

  // Todo: 이용권 CRUD
  async createTicket(CreateTicketDTO: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.TicketRepository.createTicket(CreateTicketDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTicket(): Promise<Ticket[]> {
    try {
      return this.TicketRepository.getAllTicket();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateTicket(
    id: number,
    UpdateTicketDTO: UpdateTicketDTO,
  ): Promise<Ticket> {
    try {
      return this.TicketRepository.updateTicket(id, UpdateTicketDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTicket(id: number): Promise<Ticket> {
    try {
      return this.TicketRepository.delAdminTicket(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // Todo:========================================
  // Todo: bmds관리 - 러프한 버전
  // findAllBmds1(): Promise<Bmds1[]> {
  //   try {
  //     return this.Bmds1Repository.findAll();
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // Todo: 결제관리
  // 전체 조회(admin)
  // async findAllPay(): Promise<PaymentHistory[]> {
  //   try {
  //     return await this.phRepository.findAllPay();
  //   } catch (error) {
  //     throw new Error(`Failed to find all payment histories: ${error.message}`);
  //   }
  // }

  // async ststs() {
  //   try {
  //     return this.contactRepository.find();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
