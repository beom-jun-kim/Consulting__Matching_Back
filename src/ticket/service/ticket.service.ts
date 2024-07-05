import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketRepository } from '../ticket.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../ticket.entity';
import { CreateTicketDTO } from './../dto/createTicket.dto';
import { UpdateTicketDTO } from './../dto/updateTicket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketRepository)
    private TicketRepository: TicketRepository,
  ) {}

  async getAllTicket(): Promise<Ticket[]> {
    try {
      return this.TicketRepository.getAllTicket();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOneTicket(id: number): Promise<Ticket> {
    try {
      return this.TicketRepository.getOneTicket(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createTicket(CreateTicketDTO: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.TicketRepository.createTicket(CreateTicketDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateTicket(
    id: number,
    UpdateTicketDTO: UpdateTicketDTO,
  ): Promise<Ticket> {
    try {
      return this.TicketRepository.updateTicket(id, UpdateTicketDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTicket(id: number): Promise<Ticket> {
    try {
      return this.TicketRepository.deleteTicket(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
