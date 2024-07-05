import { Injectable, NotFoundException } from '@nestjs/common';
import { BmdsCoupon } from '../entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BmdsCouponDTO } from '../dtos/createCoupon.dto';
import { User } from 'src/auth/user.entity';
import { BmdsCouponCodeDTO } from '../dtos/useCoupon.dto';
import { MeraklPay } from '../entities/merakl_pay.entity';
import * as nodemailer from 'nodemailer'; // nodemailer 임포트
import * as crypto from 'crypto';
import { MeraklPayDto } from '../dtos/merakl_pay.dto';
import { MeraklConsultDto } from '../dtos/merakl_consult.dto';
import { PwDto } from '../dtos/pw.dto';
import { Vouchers } from '../entities/vouchers.entity';
import { UseStartCouponDto } from '../dtos/useStartCoupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(BmdsCoupon)
    private readonly couponRepository: Repository<BmdsCoupon>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MeraklPay)
    private readonly meraklRepository: Repository<MeraklPay>,

    @InjectRepository(Vouchers)
    private readonly vouchersRepository: Repository<Vouchers>,

    private readonly dataSource: DataSource,
  ) {}

  async isUserVoucherActive(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    // 사용자가 admin 또는 tester 역할인지 확인
    if (user && (user.role === 'admin' || user.role === 'tester')) {
      return true;
    }
    const voucher = await this.vouchersRepository.findOne({
      where: {
        user: { id: userId }, // User 엔티티와의 관계를 통해 조회
        status: 'active',
      },
    });
    return !!voucher; // voucher가 있으면 true, 없으면 false 반환
  }

  async getVoucher(id: number): Promise<Vouchers[]> {
    const vouchers = await this.vouchersRepository.find({
      where: { user: { id } },
      order: { start_date: 'DESC' },
    });
    return vouchers;
  }

  async getAllcoupons(): Promise<MeraklPay[]> {
    const coupons = await this.meraklRepository.find();
    return coupons;
  }

  async getCouponsByCode(authenticationCode: string): Promise<BmdsCoupon[]> {
    const coupons = await this.couponRepository.find({
      where: { authenticationCode },
    });

    return coupons;
  }

  // async createBmdsCoupon(dto: BmdsCouponDTO): Promise<BmdsCoupon> {
  //   let authenticationCode: string;
  //   let bmdsCoupon: string;

  //   // 최대 5번 시도하여 중복 코드 방지
  //   for (let i = 0; i < 5; i++) {
  //     authenticationCode = this.generateRandomCode(13);
  //     const existingCoupon = await this.couponRepository.findOne({
  //       where: { authenticationCode },
  //     });

  //     if (!existingCoupon) {
  //       // 중복이 없는 코드 생성 시 반복문 종료
  //       break;
  //     }

  //     // 중복이 있으면 다시 시도
  //   }

  //   // 중복 방지를 위해 여러 번 시도했지만 여전히 중복이면 예외 처리 또는 원하는 대응 방식 선택
  //   if (!authenticationCode) {
  //     throw new Error('Failed to generate a unique authentication code.');
  //   }

  //   for (let i = 0; i < 5; i++) {
  //     bmdsCoupon = this.generateRandomCode(13);
  //     const existingCoupon = await this.couponRepository.findOne({
  //       where: { bmdsCoupon },
  //     });

  //     if (!existingCoupon) {
  //       // 중복이 없는 코드 생성 시 반복문 종료
  //       break;
  //     }

  //     // 중복이 있으면 다시 시도
  //   }

  //   // 중복 방지를 위해 여러 번 시도했지만 여전히 중복이면 예외 처리 또는 원하는 대응 방식 선택
  //   if (!bmdsCoupon) {
  //     throw new Error('Failed to generate a unique authentication code.');
  //   }

  //   const newCoupon = this.couponRepository.create({
  //     ...dto,
  //     authenticationCode,
  //     bmdsCoupon,
  //   });
  //   newCoupon.bmdsBool = true;
  //   return await this.couponRepository.save(newCoupon);
  // }

  generateRandomCode(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  async useCoupon(id: number, dto: PwDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const coupon = await this.meraklRepository.findOne({
      where: { pw: dto.pw },
    });
    if (!coupon) {
      throw new NotFoundException(`this CouponCode is not found`);
    }
    if (coupon.couponBool == true) {
      user.useCoupon = true;
      coupon.couponBool = false;
      await Promise.all([
        this.userRepository.save(user),
        this.meraklRepository.save(coupon),
      ]);
    } else {
      throw new Error(`Coupon ${dto.pw} is already used`);
    }
  }

  async useStartCoupon(id: number, dto: UseStartCouponDto): Promise<Vouchers> {
    const endDate = new Date(dto.currentDate);
    endDate.setMonth(endDate.getMonth() + dto.months);
    const users = await this.userRepository.findOne({ where: { id } });
    if (users.useCoupon === true) {
      const newVoucher = this.vouchersRepository.create({
        user: users,
        start_date: dto.currentDate,
        end_date: endDate,
        status: 'active',
        grade: 'basic',
      });
      users.useCoupon = false;
      await this.userRepository.save(users);

      return await this.vouchersRepository.save(newVoucher);
    } else {
      throw new Error('쿠폰 등록되지 않은 유저입니다.');
    }
  }

  async saveMeraklPay(meraklPayDto: MeraklPayDto): Promise<void> {
    let randomPassword = crypto.randomBytes(12).toString('hex');
    let randomConfirm = crypto.randomBytes(12).toString('hex');

    // 데이터베이스 저장을 위한 객체 생성
    const meraklPay = this.meraklRepository.create(meraklPayDto);
    meraklPay.created_at = new Date().toISOString();

    try {
      // 중복되지 않는 비밀번호 찾기
      let testMeraklPayForPassword = await this.meraklRepository.findOne({
        where: { pw: randomPassword },
      });

      while (testMeraklPayForPassword) {
        randomPassword = crypto.randomBytes(12).toString('hex');
        testMeraklPayForPassword = await this.meraklRepository.findOne({
          where: { pw: randomPassword },
        });
      }
      meraklPay.pw = randomPassword;

      // 중복되지 않는 확인 코드 찾기
      let testMeraklPayForConfirm = await this.meraklRepository.findOne({
        where: { bmdsNum: randomConfirm },
      });

      while (testMeraklPayForConfirm) {
        randomConfirm = crypto.randomBytes(12).toString('hex');
        testMeraklPayForConfirm = await this.meraklRepository.findOne({
          where: { bmdsNum: randomConfirm },
        });
      }
      meraklPay.bmdsNum = randomConfirm;

      // 데이터베이스에 저장
      await this.meraklRepository.save(meraklPay);

      // 데이터베이스 저장에 성공하면 이메일 전송
      await this.sendEmail(
        meraklPayDto.buyer_email,
        meraklPayDto.buyer_name,
        randomPassword,
      );
    } catch (error) {
      // 데이터베이스 저장 또는 이메일 전송 실패 시 에러 처리
      console.error('Error occurred:', error);
      throw new Error('Failed to save data or send email');
    }
  }

  private async sendEmail(
    email: string,
    buyer_name: string,
    password: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meraklus.ceo@gmail.com',
        pass: 'afwq uxsi lqat obnw',
      },
    });

    const mailOptions = {
      from: 'meraklus.ceo@gmail.com',
      to: email,
      subject: '인증번호가 왔습니다!',
      text: `등록하신 성함: ${buyer_name}\n이메일 주소: ${email}\n패스워드: ${password}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async getMeraklPay(pw: string): Promise<MeraklPay> {
    const meraklPay = await this.meraklRepository.findOne({
      where: { pw },
      select: ['bmdsNum', 'query'],
    });
    if (!meraklPay) {
      throw new NotFoundException('정보가 없습니다.');
    }
    return meraklPay;
  }

  async updateConsult(dto: MeraklConsultDto): Promise<void> {
    const meraklPay = await this.meraklRepository.findOne({
      where: { merchant_uid: dto.merchant_uid },
    });
    console.log(meraklPay);
    if (!meraklPay) {
      console.log('eeeeee');
      throw new NotFoundException('Merchant not found');
    }
    meraklPay.consulting_fields = dto.consulting_fields;
    meraklPay.con_name = dto.con_name;
    meraklPay.whereIn = dto.whereIn;

    await this.meraklRepository.save(meraklPay);
  }
}
