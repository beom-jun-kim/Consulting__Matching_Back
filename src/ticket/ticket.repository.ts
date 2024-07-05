/*eslint-disable */
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDTO } from './dto/createTicket.dto';
import { UpdateTicketDTO } from './dto/updateTicket.dto';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  constructor(@InjectRepository(Ticket) private dataSource: DataSource) {
    super(Ticket, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }

  async getAllTicket(): Promise<Ticket[]> {
    return await this.find({ where: { delete_yn: 'N' } });
  }

  async getOneTicket(id: number): Promise<Ticket> {
    return await this.findOneBy({ id });
  }

  async createTicket(CreateTicketDTO: CreateTicketDTO): Promise<Ticket> {
    return await this.save(CreateTicketDTO);
  }

  async updateTicket(
    id: number,
    UpdateTicketDTO: UpdateTicketDTO,
  ): Promise<Ticket> {
    await this.createQueryBuilder()
      .update(Ticket)
      .set(UpdateTicketDTO)
      .where('id = :id', { id })
      .execute();

    return await this.findOneBy({ id });
  }

  async deleteTicket(id: number): Promise<Ticket> {
    const ticket = await this.findOneBy({ id });
    ticket.delete_yn = 'Y';

    return await this.save(ticket);
  }

  // 관리자에서 티켓 자체를 삭제 가능하게 함.
  async delAdminTicket(id: number): Promise<Ticket> {
    const ticketToRemove = await this.findOneBy({ id });
    if (!ticketToRemove) {
      throw new Error(`Ticket with id ${id} not found`);
    }

    await this.remove(ticketToRemove);
    return ticketToRemove;
  }
}
