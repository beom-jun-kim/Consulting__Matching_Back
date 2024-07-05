import { Test, TestingModule } from '@nestjs/testing';
import { MentoringappController } from './mentoringapp.controller';

describe('MentoringappController', () => {
  let controller: MentoringappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentoringappController],
    }).compile();

    controller = module.get<MentoringappController>(MentoringappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
