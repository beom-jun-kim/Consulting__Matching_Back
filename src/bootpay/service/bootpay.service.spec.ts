import { Test, TestingModule } from '@nestjs/testing';
import { BootpayService } from './bootpay.service';

describe('BootpayService', () => {
  let service: BootpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BootpayService],
    }).compile();

    service = module.get<BootpayService>(BootpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
