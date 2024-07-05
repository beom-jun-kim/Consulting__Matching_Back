import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CouponService } from '../service/coupon.service';
import { ApiOperation } from '@nestjs/swagger';
import { BmdsCoupon } from '../entities/coupon.entity';
import { BmdsCouponDTO } from '../dtos/createCoupon.dto';
import { User } from 'src/auth/user.entity';
import { BmdsCouponCodeDTO } from '../dtos/useCoupon.dto';
import { MeraklPayDto } from '../dtos/merakl_pay.dto';
import { MeraklPay } from '../entities/merakl_pay.entity';
import { MeraklConsultDto } from '../dtos/merakl_consult.dto';
import { PwDto } from '../dtos/pw.dto';
import { AuthService } from './../../auth/auth.service';
import { UseStartCouponDto } from '../dtos/useStartCoupon.dto';
import { Vouchers } from '../entities/vouchers.entity';

@Controller('api/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiOperation({ summary: '코드로 쿠폰조회' })
  @Get('/bmds/:code')
  async getCouponsByCode(@Param('code') code: string): Promise<BmdsCoupon[]> {
    return await this.couponService.getCouponsByCode(code);
  }

  @ApiOperation({ summary: '바우처조회' })
  @Get('/voucher/get/:id')
  async getVoucher(@Param('id', ParseIntPipe) id: number): Promise<Vouchers[]> {
    return this.couponService.getVoucher(id);
  }

  // @ApiOperation({ summary: '쿠폰 생성' })
  // @Post('/bmds')
  // @UsePipes(new ValidationPipe())
  // async createBmdsCoupon(@Body() dto: BmdsCouponDTO): Promise<BmdsCoupon> {
  //   return await this.couponService.createBmdsCoupon(dto);
  // }

  @ApiOperation({ summary: '쿠폰 사용' })
  @Patch('/use/bmds/:id')
  async useCoupon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PwDto,
  ): Promise<void> {
    return await this.couponService.useCoupon(id, dto);
  }

  @ApiOperation({ summary: '메라클 결제 내역 저장' })
  @Post('/merakl/pay')
  async saveMeraklPay(@Body() dto: MeraklPayDto) {
    console.log(dto);
    return await this.couponService.saveMeraklPay(dto);
  }

  @ApiOperation({ summary: '메라클 인증코드 검증' })
  @Get('/merakl/pay/:pw')
  async getMeraklPay(@Param('pw') pw: string): Promise<MeraklPay> {
    console.log('controller');
    return await this.couponService.getMeraklPay(pw);
  }

  @ApiOperation({ summary: '메라클 유입경로 저장' })
  @Patch('/merakl/consult')
  async updateConsult(@Body() dto: MeraklConsultDto): Promise<void> {
    console.log(dto);
    console.log(dto.merchant_uid);
    return await this.couponService.updateConsult(dto);
  }

  @ApiOperation({ summary: '쿠폰을 시작하기' })
  @Post('/use/basic/:id')
  @UsePipes(new ValidationPipe())
  async useStartCoupon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UseStartCouponDto,
  ): Promise<Vouchers> {
    return this.couponService.useStartCoupon(id, dto);
  }
}
