import { Test, TestingModule } from '@nestjs/testing';
import { PortoneService } from './portone.service';

describe('PortoneService', () => {
  let service: PortoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortoneService],
    }).compile();

    service = module.get<PortoneService>(PortoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
