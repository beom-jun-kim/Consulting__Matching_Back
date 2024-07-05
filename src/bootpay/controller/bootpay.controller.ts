import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BootpayService } from '../service/bootpay.service';
import { BootpayDto } from '../dto/bootpay.dto';
import { TestDto } from '../dto/test.dto';
import { Response } from 'express';
import { BootPay } from '../bootpay.entity';
import { CancelDto } from '../dto/cancel.dto';
import { User } from 'src/auth/user.entity';

@Controller('api/bootpay')
export class BootpayController {
  constructor(private readonly bootpayService: BootpayService) {}
  @ApiOperation({ summary: '빌링키 생성' })
  @Post('/create/billingKey/:id')
  async saveBootpay(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BootpayDto,
  ): Promise<any> {
    return await this.bootpayService.saveBootpay(id, dto);
  }
  @ApiOperation({ summary: '결제 예약' })
  @Post('/payment/reservation')
  async paymentReservation(
    @Body() dto: TestDto,
    @Res() res: Response,
  ): Promise<BootPay> {
    return await this.bootpayService.paymentReservation(dto, res);
  }

  @ApiOperation({ summary: '결제 예약 확인 (지우면 안됨)' })
  @Post('/test')
  async testTest(@Body() dto: TestDto, @Res() res: Response): Promise<void> {
    console.log(dto);

    // 응답 헤더 설정
    res.header('Content-Type', 'application/json');

    // 응답 본문에 JSON 데이터 전송
    const responseData = {
      success: true,
    };

    // JSON 형태로 응답
    res.json(responseData);
  }

  @ApiOperation({ summary: '결제 예약 취소' })
  @Post('/cancel/reservation')
  async cancelReservation(@Body() dto: CancelDto): Promise<any> {
    return await this.bootpayService.cancelReservation(dto);
  }

  @ApiOperation({ summary: '결제 예약 취소시 필요한 reserve_id 조회' })
  @Get('/get/reserveId/:id')
  async getReserveId(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.bootpayService.getReserveId(id);
  }

  @ApiOperation({ summary: '결제 내역 개인 조회' })
  @Get('/get/payment/:id')
  async getPaymentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BootPay[]> {
    return await this.bootpayService.getPaymentById(id);
  }

  @ApiOperation({ summary: '2주 무료체험 등록' })
  @Post('/onFreeTwoWeeks/:id')
  async onFreeTwoWeeks(
    @Param('id', ParseIntPipe) id: number,
    @Body('level') level: string,
  ): Promise<User> {
    return await this.bootpayService.onFreeTwoWeeks(id, level);
  }
}
