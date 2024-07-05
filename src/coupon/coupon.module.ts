import { Module } from '@nestjs/common';
import { CouponService } from './service/coupon.service';
import { BmdsCoupon } from './entities/coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponController } from './controller/coupon.controller';
import { User } from 'src/auth/user.entity';
import { MeraklPay } from './entities/merakl_pay.entity';
import { Vouchers } from './entities/vouchers.entity';

@Module({
  providers: [CouponService],
  imports: [TypeOrmModule.forFeature([BmdsCoupon, User, MeraklPay, Vouchers])],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
