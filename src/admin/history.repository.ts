/* eslint-disable  */
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginHistory } from 'src/auth/history.entity';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(LoginHistory)
export class HistoryRepository extends Repository<LoginHistory> {
  constructor(@InjectRepository(LoginHistory) private dataSource: DataSource) {
    super(LoginHistory, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }
  async getLoginHistory(): Promise<LoginHistory[]> {
    try {
      const loginHistories = await this.find();
      return loginHistories;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get all login histories',
      );
    }
  }
}
