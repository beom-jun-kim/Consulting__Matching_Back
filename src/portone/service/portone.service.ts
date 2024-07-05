import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Portone } from '../portone.entity';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PortoneDto } from '../dto/portone.dto';
import fetch from 'node-fetch';
import * as moment from 'moment-timezone';

@Injectable()
export class PortoneService {
  constructor(
    @InjectRepository(Portone)
    private readonly portoneRepository: Repository<Portone>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  // 포트원 결제 사전 검증
  async payVerification(dto: {
    merchant_uid: string;
    amount: number;
  }): Promise<any> {
    const api_url = 'https://api.iamport.kr/payments/prepare';
    const api_key = '6560862758150612';
    const api_secret =
      'ACOCsyt8q8RrH2scB6oZmDWF3WecBLZe1EYhB6ToDAU4PMjSz6ZIxEgq1xXHjY1eviBy7xneBlWSRc1V';

    try {
      // 토큰 받아오기
      const tokenResponse = await fetch(
        'https://api.iamport.kr/users/getToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imp_key: api_key,
            imp_secret: api_secret,
          }),
        },
      );

      const tokenData = await tokenResponse.json();
      const token = tokenData.response.access_token;

      // 사전 결제금액 등록
      const paymentResponse = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          merchant_uid: dto.merchant_uid,
          amount: dto.amount,
        }),
      });

      const paymentData = await paymentResponse.json();
      return paymentData;
    } catch (error) {
      // 에러 처리
      console.error('Error:', error.message);
      throw error;
    }
  }

  // 포트원 결제 내역 저장
  async createPortone(userId: number, dto: PortoneDto): Promise<Portone> {
    console.log('userId', userId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    user.role = dto.productName;
    await this.userRepository.save(user);

    const portone = await this.portoneRepository.create({
      ...dto,
      userId,
    });

    portone.createdAt = new Date();
    portone.deleteYn = 'N';

    const currentDate = moment().tz('Asia/Seoul');
    const fiveMinutesLater = currentDate
      .clone()
      .add(dto.subscribeMonthNum, 'month');
    const isoStringTime = fiveMinutesLater.format('YYYY-MM-DDTHH:mm:ssZ');
    const isoStringDate = moment.tz(isoStringTime, 'Asia/Seoul').toDate();

    portone.expireAt = isoStringDate;

    return await this.portoneRepository.save(portone);
  }

  // 포트원 결제 내역 저장(모바일)
  // async createMobilePortone(
  //   userId: number,
  //   merchantUid: string,
  //   productPrice: number,
  //   productName: string,
  //   buyerEmail: string,
  //   buyerTel: string,
  //   buyerName: string,
  //   subscribeMonthNumber: number,
  // ): Promise<Portone> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //   });

  //   if (!user) {
  //     throw new HttpException(
  //       '존재하지 않는 유저 정보입니다.',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   user.role = productName;
  //   await this.userRepository.save(user);

  //   const portone = await this.portoneRepository.create({
  //     merchantUid,
  //     productPrice,
  //     productName,
  //     buyerEmail,
  //     buyerTel,
  //     buyerName,
  //     subscribeMonthNum: subscribeMonthNumber,
  //     userId,
  //   });

  //   portone.createdAt = new Date();
  //   portone.deleteYn = 'N';

  //   const currentDate = moment().tz('Asia/Seoul');
  //   const fiveMinutesLater = currentDate
  //     .clone()
  //     .add(subscribeMonthNumber, 'month');
  //   const isoStringTime = fiveMinutesLater.format('YYYY-MM-DDTHH:mm:ssZ');
  //   const isoStringDate = moment.tz(isoStringTime, 'Asia/Seoul').toDate();

  //   portone.expireAt = isoStringDate;

  //   return await this.portoneRepository.save(portone);
  // }

  // 포트원 결제 내역 조회
  async getPortone(userId: number): Promise<Portone> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const portone = await this.portoneRepository.findOne({
      where: { userId },
    });

    if (!portone) {
      throw new HttpException(
        '존재하지 않는 결제 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    return portone;
  }

  // 포트원 결제 내역 조회
  async callbackSchedule(body: any): Promise<any> {
    const { imp_uid } = body;
    const api_key = '6560862758150612';
    const api_secret =
      'ACOCsyt8q8RrH2scB6oZmDWF3WecBLZe1EYhB6ToDAU4PMjSz6ZIxEgq1xXHjY1eviBy7xneBlWSRc1V';

    try {
      // 토큰 받아오기
      const tokenResponse = await fetch(
        'https://api.iamport.kr/users/getToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imp_key: api_key,
            imp_secret: api_secret,
          }),
        },
      );

      const tokenData = await tokenResponse.json();
      const token = tokenData.response.access_token;

      const getPaymentData = await fetch(
        `https://api.iamport.kr/payments/${imp_uid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const paymentData = await getPaymentData.json();
      console.log('paymentData', paymentData.response);

      return paymentData;
    } catch (e) {
      console.log(e);
    }
  }
}
