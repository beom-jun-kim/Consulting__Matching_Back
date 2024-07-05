/* eslint-disable  */
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';
import { CreatePaymentHistoryDto } from './dto/createPay.dto';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(PaymentHistory)
export class PaymentHistoryRepository extends Repository<PaymentHistory> {
  constructor(
    @InjectRepository(PaymentHistory) private dataSource: DataSource,
  ) {
    super(PaymentHistory, dataSource.manager);
  }
  // 전체 조회
  getAllId(user_id: number): Promise<PaymentHistory[]> {
    return this.find({ where: { user_id } });
  }

  // 이메일별 조회
  // findByEmail(email: string): Promise<PaymentHistory[]> {
  //   return this.find({ where: { buyer_email: email } });
  // }
  // 개별 조회
  // findByDetail(id: number): Promise<PaymentHistory> {
  //   return this.findOne({ where: { id: id } });
  // }

  // 생성
  async createPaymentHistory(
    CreatePaymentHistoryDto: CreatePaymentHistoryDto,
  ): Promise<PaymentHistory> {
    const { user_id, imp_uid } = CreatePaymentHistoryDto;

    const pay = this.create({
      user_id,
      imp_uid,
    });
    await this.save(pay);
    return pay;
  }

  // 수정
  // async updatePaymentHistory(
  //   id: number,
  //   paymentHistoryData: Partial<PaymentHistory>,
  // ) {
  //   await this.update(id, paymentHistoryData);
  //   return this.findOne({ where: { id } });
  // }

  // 삭제
  // async deletePaymentHistory(imp_uid: string): Promise<{ deleted: boolean }> {
  //   await this.delete({ imp_uid: imp_uid });
  //   return { deleted: true };
  // }
}
