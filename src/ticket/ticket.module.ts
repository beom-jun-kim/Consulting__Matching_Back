import { Module } from '@nestjs/common';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './service/ticket.service';
import { TicketRepository } from './ticket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
})
export class TicketModule {}
