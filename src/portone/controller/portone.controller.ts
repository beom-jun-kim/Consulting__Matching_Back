import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PortoneService } from '../service/portone.service';
import { ApiOperation } from '@nestjs/swagger';
import { PortoneDto } from '../dto/portone.dto';
import { Portone } from '../portone.entity';
import { Response } from 'express';
@Controller('api/portone')
export class PortoneController {
  constructor(private readonly portoneService: PortoneService) {}

  @ApiOperation({ summary: '포트원 결제 사전 검증' })
  @Post('/payVerification')
  async payVerification(
    @Body() dto: { merchant_uid: string; amount: number },
  ): Promise<any> {
    return await this.portoneService.payVerification(dto);
  }

  @ApiOperation({ summary: '포트원 결제 내역 저장' })
  @Post('/createPortone/:userId')
  async createPortone(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: PortoneDto,
  ): Promise<Portone> {
    return await this.portoneService.createPortone(userId, dto);
  }

  @ApiOperation({ summary: '포트원 결제 내역 조회' })
  @Get('/getPortone/:userId')
  async getPortone(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Portone> {
    return await this.portoneService.getPortone(userId);
  }

  @ApiOperation({ summary: '포트원 결제 결과' })
  @Post('/callback/schedule')
  async callbackSchedule(@Body() body: any): Promise<void> {
    return await this.portoneService.callbackSchedule(body);
  }
}
