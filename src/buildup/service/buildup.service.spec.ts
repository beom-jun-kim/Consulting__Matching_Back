import { Test, TestingModule } from '@nestjs/testing';
import { BuildupService } from './buildup.service';

describe('BuildupService', () => {
  let service: BuildupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildupService],
    }).compile();

    service = module.get<BuildupService>(BuildupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
