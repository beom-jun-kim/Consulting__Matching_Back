import { Module } from '@nestjs/common';
import { BootpayController } from './controller/bootpay.controller';
import { BootpayService } from './service/bootpay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootPay } from './bootpay.entity';
import { User } from 'src/auth/user.entity';

@Module({
  controllers: [BootpayController],
  providers: [BootpayService],
  imports: [TypeOrmModule.forFeature([BootPay, User])],
})
export class BootpayModule {}
