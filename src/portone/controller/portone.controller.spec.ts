import { Test, TestingModule } from '@nestjs/testing';
import { PortoneController } from './portone.controller';

describe('PortoneController', () => {
  let controller: PortoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortoneController],
    }).compile();

    controller = module.get<PortoneController>(PortoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
