import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bootpay } from '@bootpay/backend-js';
import { BootpayDto } from '../dto/bootpay.dto';
import * as moment from 'moment-timezone';
import { TestDto } from '../dto/test.dto';
import { Response } from 'express';
import { BootPay } from '../bootpay.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancelDto } from '../dto/cancel.dto';
import { User } from 'src/auth/user.entity';
@Injectable()
export class BootpayService {
  constructor(
    @InjectRepository(BootPay)
    private readonly bootpayRepository: Repository<BootPay>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async saveBootpay(userId: number, dto: BootpayDto): Promise<BootPay> {
    try {
      await Bootpay.setConfiguration({
        application_id: '659f997500be04001dd30b92',
        private_key: 'IFetwC2UyIWH+06eJMqQxlFZepIqcKUPILQFx0iKI+M=',
      });

      await Bootpay.getAccessToken();
      const billing_key = await Bootpay.lookupSubscribeBillingKey(
        dto.receipt_id, // billing_key
      );
      try {
        if (dto.status_locale == '결제완료') {
          const userPaymentInfo = await this.bootpayRepository.findOne({
            where: { billing_key: billing_key.billing_key },
          });
          const userInfo = await this.userRepository.findOne({
            where: { id: userId },
          });
          if (!userInfo) {
            throw new HttpException(
              '존재하지 않는 유저 정보입니다.',
              HttpStatus.NOT_FOUND,
            );
          } else {
            userInfo.role = dto.order_name;
            await this.userRepository.save(userInfo);
          }

          if (!userPaymentInfo) {
            throw new HttpException(
              '결제 정보가 없습니다.',
              HttpStatus.NOT_FOUND,
            );
          } else {
            userPaymentInfo.userId = userId;
            userPaymentInfo.created_at = new Date();
            userPaymentInfo.updated_at = new Date();
            userPaymentInfo.username = dto.username;
            userPaymentInfo.email = dto.email;
            userPaymentInfo.phone = dto.phone;
            return await this.bootpayRepository.save(userPaymentInfo);
          }
        }
      } catch (err) {
        console.log('err', err);
      }
    } catch (e) {
      // 발급 실패시 오류
      console.error(e); // 에러를 콘솔에 기록
      throw e; // 에러를 호출자에게 전파
    }
  }
  // 결제 시 웹훅을 통해서 자동 호출(결제 예약)
  async paymentReservation(dto: TestDto, res: Response): Promise<BootPay> {
    if (dto.status_locale == '결제완료') {
      // 응답 헤더 설정
      res.header('Content-Type', 'application/json');
      // 응답 본문에 JSON 데이터 전송
      const responseData = {
        success: true,
      };
      // JSON 형태로 응답
      res.json(responseData);

      try {
        // 현재 날짜 및 시간을 한국 시간대로 가져오기
        const currentDate = moment().tz('Asia/Seoul');
        // 5분 뒤의 날짜와 시간을 구하기
        const fiveMinutesLater = currentDate.clone().add(1, 'month');
        // 사용자 정의 형식으로 날짜 포맷
        const isoStringTime = fiveMinutesLater.format('YYYY-MM-DDTHH:mm:ssZ');
        // ISO 문자열을 moment 객체로 변환 후 Date 객체로 변환
        const isoStringDate = moment.tz(isoStringTime, 'Asia/Seoul').toDate();

        await Bootpay.setConfiguration({
          application_id: '659f997500be04001dd30b92',
          private_key: 'IFetwC2UyIWH+06eJMqQxlFZepIqcKUPILQFx0iKI+M=',
        });
        await Bootpay.getAccessToken();
        // 결제 예약하기
        const reservation = await Bootpay.subscribePaymentReserve({
          billing_key: dto.billing_key,
          order_name: 'BMDS-' + dto.order_name,
          price: dto.price,
          order_id: `oid_${new Date().getTime()}`,
          reserve_execute_at: isoStringDate,
        });
        const bootpay = new BootPay();
        bootpay.billing_key = dto.billing_key;
        bootpay.order_id = dto.order_id;
        bootpay.order_name = 'BMDS-' + dto.order_name;
        bootpay.price = dto.price;
        bootpay.status_locale =
          dto.status_locale == '결제완료' ? '구독중' : dto.status_locale;
        await this.bootpayRepository.save(bootpay);
        if (reservation.reserve_id) {
          const userPaymentInfo = await this.bootpayRepository.findOne({
            where: { billing_key: dto.billing_key },
          });
          console.log('userPaymentInfo', userPaymentInfo);

          if (!userPaymentInfo) {
            throw new HttpException(
              '결제 정보가 없습니다.',
              HttpStatus.NOT_FOUND,
            );
          } else {
            userPaymentInfo.reserve_id = reservation.reserve_id;
            userPaymentInfo.updated_at = new Date();
            userPaymentInfo.nextpay_at = isoStringDate;
            return await this.bootpayRepository.save(userPaymentInfo);
          }
        }
      } catch (e) {
        // 발급 실패시 오류
        console.log('e', e);
      }
    } else {
      throw new HttpException(
        '결제중 오류가 발생하였습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 결제 예약 취소
  async cancelReservation(dto: CancelDto): Promise<any> {
    try {
      await Bootpay.setConfiguration({
        application_id: '659f997500be04001dd30b92',
        private_key: 'IFetwC2UyIWH+06eJMqQxlFZepIqcKUPILQFx0iKI+M=',
      });

      const cancelUserInfo = await this.bootpayRepository.findOne({
        where: { reserve_id: dto.reserve_id },
      });

      if (!cancelUserInfo) {
        throw new HttpException('결제 내역이 없습니다.', HttpStatus.NOT_FOUND);
      } else {
        await Bootpay.getAccessToken();
        const cancel = await Bootpay.cancelSubscribeReserve(dto.reserve_id);
        if (cancel.success === true) {
          cancelUserInfo.status_locale = '구독해지';
          cancelUserInfo.nextpay_at = null;
          await this.bootpayRepository.save(cancelUserInfo);
        }
      }
    } catch (e) {
      // 발급 실패시 오류
      throw Error(e.message);
    }
  }

  // 결제 예약 취소 reserve_id 조회
  async getReserveId(id: number): Promise<any> {
    try {
      const userReserveId = await this.bootpayRepository.findOne({
        where: { id },
      });
      return userReserveId;
    } catch (e) {
      // 발급 실패시 오류
      console.error(e); // 에러를 콘솔에 기록
      throw e; // 에러를 호출자에게 전파
    }
  }

  // 결제 내역 개인 조회
  async getPaymentById(userId: number): Promise<BootPay[]> {
    try {
      const userPayInfo = await this.bootpayRepository.find({
        where: { userId },
        order: { created_at: 'DESC' },
      });
      return userPayInfo;
    } catch (e) {
      // 발급 실패시 오류
      console.error(e); // 에러를 콘솔에 기록
      throw e; // 에러를 호출자에게 전파
    }
  }

  // 2주 무료체험하기
  async onFreeTwoWeeks(userId: number, level: string): Promise<User> {
    try {
      const userPayInfo = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!userPayInfo) {
        throw new HttpException(
          '유저 정보가 없습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      userPayInfo.role = level;
      userPayInfo.twoWeeksStartAt = new Date();

      return await this.userRepository.save(userPayInfo);
    } catch (e) {
      // 발급 실패시 오류
      console.error(e); // 에러를 콘솔에 기록
      throw e; // 에러를 호출자에게 전파
    }
  }
}
