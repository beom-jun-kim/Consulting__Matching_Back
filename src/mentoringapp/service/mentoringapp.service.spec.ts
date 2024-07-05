import { Test, TestingModule } from '@nestjs/testing';
import { MentoringappService } from './mentoringapp.service';

describe('MentoringappService', () => {
  let service: MentoringappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentoringappService],
    }).compile();

    service = module.get<MentoringappService>(MentoringappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
