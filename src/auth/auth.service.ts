/*eslint-disable */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PaymentHistory } from './paymentHistory.entity';
import { PaymentHistoryRepository } from './paymentHistory.repository';
import { CreatePaymentHistoryDto } from './dto/createPay.dto';
import { InjectRepository } from '@nestjs/typeorm';

import axios from 'axios';
import { GroupCode } from './groupCode.entity';
import { Portone } from 'src/portone/portone.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @InjectRepository(PaymentHistoryRepository)
    private phRepository: PaymentHistoryRepository,

    @InjectRepository(GroupCode)
    private readonly groupCodeRepository: Repository<GroupCode>,
    @InjectRepository(Portone)
    private readonly portoneRepository: Repository<Portone>,

    private readonly dataSource: DataSource,
  ) {}

  //start 포트원 토큰 발급 부분
  async getIamportToken() {
    const response = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: '6560862758150612',
        imp_secret:
          'F1IZJ9Qq28WHU0VhKJUcBIMOC6qST6hJDUuNF224PK6kw1G2n9HkKjosElkYBW5qkoubSzbOujRfrXvV',
      },
    });

    return response.data;
  }
  //end 포트원 토큰 발급 부분
  async getHistory(token: string, imid: string): Promise<any> {
    const response = await axios({
      url: 'https://api.iamport.kr/payments/' + imid,
      method: 'get', // GET method
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    // 필요한 데이터만 추출
    const requiredData = response.data;

    return requiredData;
  }

  async cancelPortOne(portOneCancleDto) {
    try {
      const response = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        portOneCancleDto,
        {
          headers: {
            Authorization: portOneCancleDto.token, // 여기에 access_token 추가
          },
        },
      );
      // await this.phRepository.deletePaymentHistory(portOneCancleDto.imp_uid);
      return response.data;
    } catch (error) {
      // 에러 처리 로직
      console.error(error);
    }
  }

  async portOneGetAll(user_id: number): Promise<any> {
    const imp_ids = await this.phRepository.getAllId(user_id);

    // imp_uid 값만을 추출하여 쿼리 스트링을 만듭니다.
    const imp_uids = imp_ids.map((id) => `imp_uid[]=${id.imp_uid}`).join('&');

    const token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: '6560862758150612',
        imp_secret:
          'F1IZJ9Qq28WHU0VhKJUcBIMOC6qST6hJDUuNF224PK6kw1G2n9HkKjosElkYBW5qkoubSzbOujRfrXvV',
      },
    });

    try {
      const response = await axios.get(
        `https://api.iamport.kr/payments?${imp_uids}`,
        {
          headers: {
            Authorization: token.data.response.access_token, // 여기에 access_token 추가
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  // async confirmEmail(email: string, code: string): Promise<any> {
  //   return this.userRepository.confirmEmail(email, code);
  // }

  async signIn(
    authLoginDto: AuthLoginDto,
    loginDevice: string,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authLoginDto;
    const user = await this.userRepository.findOneBy({ email });

    // if (user.isEmailConfirmed === 0) {
    //   throw new UnauthorizedException('login failed');
    // }

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const affiliationGroup = user.affiliationGroup;
      const payload = {
        email,
        id: user.id,
        role: user.role,
        createAt: user.createdAt,
        affiliationGroup,
        twoWeeksStartAt: user.twoWeeksStartAt,
        isStudent: user.isStudent,
      }; // 여기에는 중요한 정보 넣지 말기
      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: '360m',
      });
      this.userRepository.saveLoginHistory(user, loginDevice);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

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
      // 유저 토큰 생성 (Secret + Payload)

      const payload = { email, id: user.id, role: user.role }; // 여기에는 중요한 정보 넣지 말기
      const accessToken = await this.jwtService.sign(payload);
      this.userRepository.saveLoginHistory(user, loginDevice);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
  //TODO:==================================================
  async findEmail(name: string, phoneNum: string): Promise<string> {
    return this.userRepository.findEmail(name, phoneNum);
  }

  async findPassword(
    name: string,
    email: string,
    phoneNum: string,
  ): Promise<string> {
    return this.userRepository.findPassword(name, email, phoneNum);
  }
  //TODO:==================================================
  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }

  async getByIdForName(id: number): Promise<User> {
    const name = await this.userRepository.findOne({
      where: { id },
      select: ['name'],
    });
    return name;
  }

  async updateById(
    id: number,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.userRepository.updateById(id, authCredentialsDto);
  }

  async deleteById(id: number): Promise<User> {
    return this.userRepository.deleteById(id);
  }

  async updateResume(id: number, file: string): Promise<User> {
    return await this.userRepository.uploadResume(id, file);
  }

  async downloadResume(id: number, res): Promise<any> {
    return await this.userRepository.downloadResume(id, res);
  }

  // todo: 결제 기록 관련

  //  이메일별로 조회 (이건 main)
  // async findByEmailPay(email: string): Promise<PaymentHistory[]> {
  //   try {
  //     return await this.phRepository.findByEmail(email);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to find payment histories by email ${email}: ${error.message}`,
  //     );
  //   }
  // }

  // 개별 조회(이건 둘다 가능)
  // async findByDetailPay(id: number): Promise<PaymentHistory> {
  //   try {
  //     return await this.phRepository.findByDetail(id);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to find payment history by id ${id}: ${error.message}`,
  //     );
  //   }
  // }

  // 생성(결제성공시)
  async createPaymentHistory(
    CreatePaymentHistoryDto: CreatePaymentHistoryDto,
  ): Promise<PaymentHistory> {
    try {
      return await this.phRepository.createPaymentHistory(
        CreatePaymentHistoryDto,
      );
    } catch (error) {
      throw new Error(`Failed to create payment history: ${error.message}`);
    }
  }

  // 수정(필요할까?- 결제처리,환불처리 등 상태표시?)
  // async updatePaymentHistory(
  //   id: number,
  //   paymentHistoryData: Partial<PaymentHistory>,
  // ): Promise<PaymentHistory> {
  //   try {
  //     return await this.phRepository.updatePaymentHistory(
  //       id,
  //       paymentHistoryData,
  //     );
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to update payment history with id ${id}: ${error.message}`,
  //     );
  //   }
  // }

  // 삭제
  // async deletePaymentHistory(imp_uid: string): Promise<{ deleted: boolean }> {
  //   try {
  //     return await this.phRepository.deletePaymentHistory(imp_uid);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to delete payment history with id ${imp_uid}: ${error.message}`,
  //     );
  //   }
  // }

  // 유저 그룹코드 입력
  async updateGroupCode(id: number, codeName: string): Promise<User> {
    const groupCode = await this.groupCodeRepository.findOne({
      where: { codeName },
    });

    if (!groupCode) {
      throw new HttpException(
        '존재하지 않는 그룹코드입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 회원정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log(user.affiliationGroup);
    if (
      user.affiliationGroup !== null &&
      user.affiliationGroup !== undefined &&
      user.affiliationGroup.trim() !== ''
    ) {
      throw new HttpException(
        '이미 그룹코드가 입력되어 있습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.affiliationGroup = groupCode.codeName;

    await user.save();

    return user;
  }

  // 슈퍼바이저의 멘티리스트
  async menteeListForSupervisor(dto: User): Promise<User> {
    const user = await this.groupCodeRepository.query(
      `
      SELECT ROW_NUMBER() OVER (ORDER BY u.id) AS rowNo
           , u.id
           , u.email 
           , u.name 
           , u.created_at
           , u.useYn
           , DATE_FORMAT(u.created_at, '%Y.%m.%d') AS createAtFormat
           , p.expireAt 
           , IFNULL(bm.bmCnt, 0) AS bmCnt
           , IFNULL(ma.mentoringCnt, 0) AS mentoringCnt
           , u.confirmationCode 
      FROM User u LEFT JOIN Portone p ON u.id = p.userId 
           LEFT JOIN (
                SELECT userId
                     , COUNT(*) AS bmCnt
                FROM BuildUpBmds bub  
                WHERE 1 = 1
                GROUP BY userId     
           ) bm on u.id = bm.userId
           LEFT JOIN (
                SELECT userId
                     , COUNT(*) AS mentoringCnt
                FROM MentoringApp ma 
                WHERE 1 = 1
                GROUP BY userId     
      ) ma on u.id = ma.userId
      WHERE 1 = 1
            AND role IN ('buildup', 'student', 's-consultant') 
            AND u.affiliationGroup  IN (
                   SELECT affiliationGroup -- 슈퍼바이저코드
                   FROM User u  
                   WHERE 1 = 1
                         AND id = ?  -- 슈퍼바이저의 유저아이디.     
       )`,
      [dto.id],
    );

    return user;
  }

  // 슈퍼바이저의 멘토리스트
  async mentoListForSupervisor(dto: User): Promise<User> {
    const user = await this.groupCodeRepository.query(
      `
      SELECT ROW_NUMBER() OVER (ORDER BY u.id) AS rowNo
           , u.id
           , u.email
           , u.name
           , u.created_at
           , u.useYn
           , DATE_FORMAT(u.created_at, '%Y.%m.%d') AS createAtFormat
           , p.expireAt
           , IFNULL(bm.bmCnt, 0) AS bmCnt
           , IFNULL(ma.mentoringCnt, 0) AS mentoringCnt
           , u.confirmationCode
           , tl.tagNames
      FROM User u LEFT JOIN Portone p ON u.id = p.userId
      LEFT JOIN (
           SELECT userId
                , COUNT(*) AS bmCnt
           FROM BuildUpBmds bub
           WHERE 1 = 1
           GROUP BY userId
      ) bm on u.id = bm.userId
      LEFT JOIN (
           SELECT userId
                , COUNT(*) AS mentoringCnt
           FROM MentoringApp ma
           WHERE 1 = 1
           GROUP BY userId
      ) ma on u.id = ma.userId
      LEFT JOIN (
           SELECT userId
                , GROUP_CONCAT(tl.tagName, ', ') AS tagNames
           FROM TagList tl
           GROUP BY userId            
      ) tl ON u.id = tl.userId
      WHERE 1 = 1
       AND role IN ('buildup', 'student', 's-consultant')
       AND u.affiliationGroup  IN (
              SELECT affiliationGroup -- 슈퍼바이저코드
              FROM User u
              WHERE 1 = 1
                    AND id = ?  -- 슈퍼바이저의 유저아이디.
      )`,
      [dto.id],
    );

    return user;
  }

  // 비밀번호 초기화
  async initPassword(dto: User): Promise<void> {
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash('asdf1234!@#$', salt);
    console.log(dto);
    await this.groupCodeRepository.query(
      `
      UPDATE User 
      SET password = ?
      WHERE 1 = 1
            AND id = ?
      `,
      [dto.password, dto.id],
    );
  }

  // 슈퍼바이저의 멘토리스트
  async updateUseYn(dto: User): Promise<void> {
    await this.groupCodeRepository.query(
      `
      UPDATE User 
      SET useYn = ?
      WHERE 1 = 1
            AND id = ?
      `,
      [dto.useYn, dto.id],
    );
  }
}
