import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from '../service/match.service';
import { SelectedTagDto } from '../dtos/selectedTag.dto';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    // MatchService를 모의(MOCK) 객체로 생성
    const mockMatchService = {
      selectTag: jest.fn((id, dtos) => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: mockMatchService,
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('selectTag', () => {
    it('should call matchService.selectTag with expected params', async () => {
      const id = 1;
      const dtos: SelectedTagDto[] = [
        {
          id: 1,
          tagName: 'test',
        },
      ];
      await controller.selectTag(id, dtos);
      expect(service.selectTag).toHaveBeenCalledWith(id, dtos);
    });
  });
});
