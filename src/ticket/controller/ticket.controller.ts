/*eslint-disable*/
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './../service/ticket.service';
import { ApiOperation } from '@nestjs/swagger';
import { Ticket } from '../ticket.entity';
import { CreateTicketDTO } from './../dto/createTicket.dto';
import { UpdateTicketDTO } from './../dto/updateTicket.dto';

@Controller('api/ticket')
export class TicketController {
  constructor(private TicketService: TicketService) {}

  @ApiOperation({ summary: '이용권 전체 조회' })
  @Get()
  async getAllTicket(): Promise<Ticket[]> {
    return await this.TicketService.getAllTicket();
  }

  @ApiOperation({ summary: '이용권 개별 조회' })
  @Get('/:id')
  async getOneTicket(@Param('id') id: number): Promise<Ticket> {
    return await this.TicketService.getOneTicket(id);
  }

  @ApiOperation({ summary: '이용권 생성 : 관리자 권한' })
  @Post()
  async createTicket(
    @Body() CreateTicketDTO: CreateTicketDTO,
  ): Promise<Ticket> {
    return await this.TicketService.createTicket(CreateTicketDTO);
  }

  @ApiOperation({ summary: '이용권 수정 : 관리자 권한' })
  @Put('/:id')
  async updateTicket(
    @Param('id') id: number,
    @Body() UpdateTicketDTO: UpdateTicketDTO,
  ): Promise<Ticket> {
    return await this.TicketService.updateTicket(id, UpdateTicketDTO);
  }

  @ApiOperation({ summary: '이용권 삭제 : 관리자 권한' })
  @Put('/delete/:id')
  async deleteTicket(@Param('id') id: number): Promise<Ticket> {
    return await this.TicketService.deleteTicket(id);
  }
}
