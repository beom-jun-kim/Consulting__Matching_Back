import { Test, TestingModule } from '@nestjs/testing';
import { BuildupController } from './buildup.controller';

describe('BuildupController', () => {
  let controller: BuildupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildupController],
    }).compile();

    controller = module.get<BuildupController>(BuildupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
