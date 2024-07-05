import { Test, TestingModule } from '@nestjs/testing';
import { BootpayController } from './bootpay.controller';

describe('BootpayController', () => {
  let controller: BootpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BootpayController],
    }).compile();

    controller = module.get<BootpayController>(BootpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
