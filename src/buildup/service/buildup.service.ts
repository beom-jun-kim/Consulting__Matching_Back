import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildUpBmds } from '../entities/buildUpBmds.entity';
import { In, Repository } from 'typeorm';
import { SaveBuildUpBmdsDto } from '../dtos/saveBuildUpBmds.dto';
import { BuildStep11 } from '../entities/buildStep11.entity';
import { BuildStep12 } from '../entities/buildStep12.entity';
import { BuildStep13 } from '../entities/buildStep13.entity';
import { BuildStep14 } from '../entities/buildStep14.entity';
import { BuildStep15 } from '../entities/buildStep15.entity';
import { BuildStep21 } from '../entities/buildStep21.entity';
import { BuildStep22 } from '../entities/buildStep22.entity';
import { BuildStep23 } from '../entities/buildStep23.entity';
import { BuildStep24 } from '../entities/buildStep24.entity';
import { BuildStep25 } from '../entities/buildStep25.entity';
import { BuildStep31 } from '../entities/buildStep31.entity';
import { BuildStep32 } from '../entities/buildStep32.entity';
import { BuildStep33 } from '../entities/buildStep33.entity';
import { BuildStep34 } from '../entities/buildStep34.entity';
import { BuildStep35 } from '../entities/buildStep35.entity';
import { BuildStep36 } from '../entities/buildStep36.entity';
import { BuildStep37 } from '../entities/buildStep37.entity';
import { BuildStep41 } from '../entities/buildStep41.entity';
import { BuildStep42 } from '../entities/buildStep42.entity';
import { BuildStep43 } from '../entities/buildStep43.entity';
import { BuildStep44 } from '../entities/buildStep44.entity';
import { BuildStep51 } from '../entities/buildStep51.entity';
import { BuildStep52 } from '../entities/buildStep52.entity';
import { BuildStep53 } from '../entities/buildStep53.entity';
import { BuildStep54 } from '../entities/buildStep54.entity';
import { BuildStep55 } from '../entities/buildStep55.entity';
import { BuildStep56 } from '../entities/buildStep56.entity';
import { BuildStep57 } from '../entities/buildStep57.entity';
import { BuildStep58 } from '../entities/buildStep58.entity';
import { BuildStep59 } from '../entities/buildStep59.entity';
import { BuildStep60 } from '../entities/buildStep60.entity';
import { BuildStep61 } from '../entities/buildStep61.entity';
import { BuildStep62 } from '../entities/buildStep62.entity';
import { BuildStep63 } from '../entities/buildStep63.entity';
import { BuildStep71 } from '../entities/buildStep71.entity';
import { BuildStep72 } from '../entities/buildStep72.entity';
import { BuildStep73 } from '../entities/buildStep73.entity';
import { BuildStep74 } from '../entities/buildStep74.entity';
import { SaveBuildStep11Dto } from '../dtos/saveBuildStep11.dto';
import { SaveBuildStep12Dto } from '../dtos/saveBuildStep12.dto';
import { SaveBuildStep13Dto } from '../dtos/saveBuildStep13.dto';
import { SaveBuildStep14Dto } from '../dtos/saveBuildStep14.dto';
import { SaveBuildStep15Dto } from '../dtos/saveBuildStep15.dto';
import { SaveBuildStep21Dto } from '../dtos/saveBuildStep21.dto';
import { SaveBuildStep22Dto } from '../dtos/saveBuildStep22.dto';
import { SaveBuildStep23Dto } from '../dtos/saveBuildStep23.dto';
import { SaveBuildStep24Dto } from '../dtos/saveBuildStep24.dto';
import { SaveBuildStep25Dto } from '../dtos/saveBuildStep25.dto';
import { SaveBuildStep31Dto } from '../dtos/saveBuildStep31.dto';
import { SaveBuildStep32Dto } from '../dtos/saveBuildStep32.dto';
import { SaveBuildStep33Dto } from '../dtos/saveBuildStep33.dto';
import { SaveBuildStep34Dto } from '../dtos/saveBuildStep34.dto';
import { SaveBuildStep35Dto } from '../dtos/saveBuildStep35.dto';
import { SaveBuildStep36Dto } from '../dtos/SaveBuildStep36.dto';
import { SaveBuildStep37Dto } from '../dtos/saveBuildStep37.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { SaveBuildStep41Dto } from '../dtos/saveBuildStep41.dto';
import { SaveBuildStep43Dto } from '../dtos/saveBuildStep43.dto';
import { SaveBuildStep44Dto } from '../dtos/saveBuildStep44.dto';
import { SaveBuildStep51Dto } from '../dtos/saveBuildStep51.dto';
import { SaveBuildStep52Dto } from '../dtos/saveBuildStep52.dto';
import { SaveBuildStep53Dto } from '../dtos/saveBuildStep53.dto';
import { SaveBuildStep54Dto } from '../dtos/saveBuildStep54.dto';
import { SaveBuildStep55Dto } from '../dtos/saveBuildStep55.dto';
import { SaveBuildStep57Dto } from '../dtos/saveBuildstep57.dto';
import { SaveBuildStep56Dto } from '../dtos/saveBuildStep56.dto';
import { SaveBuildStep58Dto } from '../dtos/saveBuildstep58.dto';
import { SaveBuildStep59Dto } from '../dtos/saveBuildStep59.dto';
import { SaveBuildStep61Dto } from '../dtos/saveBuildStep61.dto';
import { SaveBuildStep62Dto } from '../dtos/saveBuildStep62.dto';
import { SaveBuildStep63Dto } from '../dtos/saveBuildStep63.dto';
import { SaveBuildStep71Dto } from '../dtos/saveBuildStep71.dto';
import { SaveBuildStep72Dto } from '../dtos/saveBuildStep72.dto';
import { SaveBuildStep73Dto } from '../dtos/saveBuildStep73.dto';
import { SaveBuildStep74Dto } from '../dtos/saveBuildStep74.dto';
import { SaveBuildStep34_2Dto } from '../dtos/saveBuildStep34_2.dto';
import { BuildStep34_2 } from '../entities/buildStep34_2.entity';
import { BuildStep35One } from '../entities/buildStep35One.entity';
import { SaveBuildStep35OneDto } from '../dtos/saveBuildStep35One.dto';
import { BuildUpReview } from '../entities/buildReview.entity';
import { SaveReviewDto } from '../dtos/saveReview.dto';
import { SaveBuildStep42Dto } from '../dtos/saveBuildStep42.dto';
import { SaveBuildStep60Dto } from '../dtos/saveBuildStep60.dto';
import { User } from 'src/auth/user.entity';
import checkUserRoles from 'src/utills/checkRole';
import { DataSource } from 'typeorm';
import { Portone } from 'src/portone/portone.entity';
@Injectable()
export class BuildupService {
  private s3: AWS.S3;
  constructor(
    @InjectRepository(BuildUpReview)
    private readonly buildReviewRepository: Repository<BuildUpReview>,

    @InjectRepository(BuildUpBmds)
    private readonly buildUpBmdsRepository: Repository<BuildUpBmds>,

    @InjectRepository(BuildStep11)
    private readonly buildStep11Repository: Repository<BuildStep11>,

    @InjectRepository(BuildStep12)
    private readonly buildStep12Repository: Repository<BuildStep12>,

    @InjectRepository(BuildStep13)
    private readonly buildStep13Repository: Repository<BuildStep13>,

    @InjectRepository(BuildStep14)
    private readonly buildStep14Repository: Repository<BuildStep14>,

    @InjectRepository(BuildStep15)
    private readonly buildStep15Repository: Repository<BuildStep15>,

    @InjectRepository(BuildStep21)
    private readonly buildStep21Repository: Repository<BuildStep21>,

    @InjectRepository(BuildStep22)
    private readonly buildStep22Repository: Repository<BuildStep22>,

    @InjectRepository(BuildStep23)
    private readonly buildStep23Repository: Repository<BuildStep23>,

    @InjectRepository(BuildStep24)
    private readonly buildStep24Repository: Repository<BuildStep24>,

    @InjectRepository(BuildStep25)
    private readonly buildStep25Repository: Repository<BuildStep25>,

    @InjectRepository(BuildStep31)
    private readonly buildStep31Repository: Repository<BuildStep31>,

    @InjectRepository(BuildStep32)
    private readonly buildStep32Repository: Repository<BuildStep32>,

    @InjectRepository(BuildStep33)
    private readonly buildStep33Repository: Repository<BuildStep33>,

    @InjectRepository(BuildStep34)
    private readonly buildStep34Repository: Repository<BuildStep34>,

    @InjectRepository(BuildStep34_2)
    private readonly buildStep34_2Repository: Repository<BuildStep34_2>,

    @InjectRepository(BuildStep35)
    private readonly buildStep35Repository: Repository<BuildStep35>,

    @InjectRepository(BuildStep35One)
    private readonly buildStep35OneRepository: Repository<BuildStep35One>,

    @InjectRepository(BuildStep36)
    private readonly buildStep36Repository: Repository<BuildStep36>,

    @InjectRepository(BuildStep37)
    private readonly buildStep37Repository: Repository<BuildStep37>,

    @InjectRepository(BuildStep41)
    private readonly buildStep41Repository: Repository<BuildStep41>,

    @InjectRepository(BuildStep42)
    private readonly buildStep42Repository: Repository<BuildStep42>,

    @InjectRepository(BuildStep43)
    private readonly buildStep43Repository: Repository<BuildStep43>,

    @InjectRepository(BuildStep44)
    private readonly buildStep44Repository: Repository<BuildStep44>,

    @InjectRepository(BuildStep51)
    private readonly buildStep51Repository: Repository<BuildStep51>,

    @InjectRepository(BuildStep52)
    private readonly buildStep52Repository: Repository<BuildStep52>,

    @InjectRepository(BuildStep53)
    private readonly buildStep53Repository: Repository<BuildStep53>,

    @InjectRepository(BuildStep54)
    private readonly buildStep54Repository: Repository<BuildStep54>,

    @InjectRepository(BuildStep55)
    private readonly buildStep55Repository: Repository<BuildStep55>,

    @InjectRepository(BuildStep56)
    private readonly buildStep56Repository: Repository<BuildStep56>,

    @InjectRepository(BuildStep57)
    private readonly buildStep57Repository: Repository<BuildStep57>,

    @InjectRepository(BuildStep58)
    private readonly buildStep58Repository: Repository<BuildStep58>,

    @InjectRepository(BuildStep59)
    private readonly buildStep59Repository: Repository<BuildStep59>,

    @InjectRepository(BuildStep60)
    private readonly buildStep60Repository: Repository<BuildStep60>,

    @InjectRepository(BuildStep61)
    private readonly buildStep61Repository: Repository<BuildStep61>,

    @InjectRepository(BuildStep62)
    private readonly buildStep62Repository: Repository<BuildStep62>,

    @InjectRepository(BuildStep63)
    private readonly buildStep63Repository: Repository<BuildStep63>,

    @InjectRepository(BuildStep71)
    private readonly buildStep71Repository: Repository<BuildStep71>,

    @InjectRepository(BuildStep72)
    private readonly buildStep72Repository: Repository<BuildStep72>,

    @InjectRepository(BuildStep73)
    private readonly buildStep73Repository: Repository<BuildStep73>,

    @InjectRepository(BuildStep74)
    private readonly buildStep74Repository: Repository<BuildStep74>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Portone)
    private readonly portoneRepository: Repository<Portone>,

    private readonly dataSource: DataSource,
  ) {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });

    // AWS S3 객체 초기화
    this.s3 = new AWS.S3();
  }
  // buildup업데이트용 주석

  async createBuildUpBmds(
    userId: number,
    dto: SaveBuildUpBmdsDto,
  ): Promise<BuildUpBmds> {
    const buildUpBmds = new BuildUpBmds();
    buildUpBmds.userId = userId;
    buildUpBmds.title = dto.title;
    buildUpBmds.bmVersion = dto.bmVersion;
    buildUpBmds.createdAt = new Date();
    return await this.buildUpBmdsRepository.save(buildUpBmds);
  }

  async updateBuildUpBmds(
    bmdsId: number,
    dto: SaveBuildUpBmdsDto,
  ): Promise<BuildUpBmds> {
    const buildUpBmds = await this.buildUpBmdsRepository.findOne({
      where: { id: bmdsId },
    });
    buildUpBmds.title = dto.title;
    buildUpBmds.updatedAt = new Date();
    return await this.buildUpBmdsRepository.save(buildUpBmds);
  }

  async deleteBuildUpBmds(bmdsId: number): Promise<void> {
    await this.buildUpBmdsRepository.delete({ id: bmdsId });
  }

  async getBuildUpBmds(
    userId: number,
  ): Promise<{ data: BuildUpBmds[]; bmCreationNum: number }> {
    const bmCreation = await this.portoneRepository.findOne({
      where: { userId },
    });
    let bmNum = 0;
    if (bmCreation == null) {
      bmNum = 0;
    } else {
      bmNum = bmCreation.bmCreationNum;
    }
    console.log('bmCreation', bmCreation);

    const data = await this.buildUpBmdsRepository.find({ where: { userId } });
    return { data, bmCreationNum: bmNum };
  }

  async getBuildUpBmdsById(id: number): Promise<BuildUpBmds> {
    return await this.buildUpBmdsRepository.findOne({ where: { id } });
  }

  async saveBuildStep11(
    dto: SaveBuildStep11Dto,
    bmdsId: number,
  ): Promise<BuildStep11> {
    let buildStep11 = await this.buildStep11Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep11) {
      buildStep11 = new BuildStep11();
    }

    Object.assign(buildStep11, dto);
    buildStep11.bmdsId = bmdsId;
    return await this.buildStep11Repository.save(buildStep11);
  }

  async saveBuildStep12(
    dto: SaveBuildStep12Dto,
    bmdsId: number,
  ): Promise<BuildStep12> {
    let buildStep12 = await this.buildStep12Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep12) {
      buildStep12 = new BuildStep12();
    }

    Object.assign(buildStep12, dto);
    buildStep12.bmdsId = bmdsId;
    return await this.buildStep12Repository.save(buildStep12);
  }

  async saveBuildStep13(
    dto: SaveBuildStep13Dto,
    bmdsId: number,
  ): Promise<BuildStep13> {
    let buildStep13 = await this.buildStep13Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep13) {
      buildStep13 = new BuildStep13();
    }

    Object.assign(buildStep13, dto);
    buildStep13.bmdsId = bmdsId;
    return await this.buildStep13Repository.save(buildStep13);
  }

  async saveBuildStep14(
    dto: SaveBuildStep14Dto,
    bmdsId: number,
  ): Promise<BuildStep14> {
    let buildStep14 = await this.buildStep14Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep14) {
      buildStep14 = new BuildStep14();
    }

    Object.assign(buildStep14, dto);
    buildStep14.bmdsId = bmdsId;
    return await this.buildStep14Repository.save(buildStep14);
  }

  async saveBuildStep15(
    dto: SaveBuildStep15Dto,
    bmdsId: number,
  ): Promise<BuildStep15> {
    let buildStep15 = await this.buildStep15Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep15) {
      buildStep15 = new BuildStep15();
    }

    Object.assign(buildStep15, dto);
    buildStep15.bmdsId = bmdsId;
    return await this.buildStep15Repository.save(buildStep15);
  }

  async saveBuildStep21(
    dto: SaveBuildStep21Dto,
    bmdsId: number,
  ): Promise<BuildStep21> {
    let buildStep21 = await this.buildStep21Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep21) {
      buildStep21 = new BuildStep21();
    }

    Object.assign(buildStep21, dto);
    buildStep21.bmdsId = bmdsId;
    return await this.buildStep21Repository.save(buildStep21);
  }

  async saveBuildStep22(
    dto: SaveBuildStep22Dto,
    bmdsId: number,
  ): Promise<BuildStep22> {
    let buildStep22 = await this.buildStep22Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep22) {
      buildStep22 = new BuildStep22();
    }

    Object.assign(buildStep22, dto);
    buildStep22.bmdsId = bmdsId;
    return await this.buildStep22Repository.save(buildStep22);
  }

  async saveBuildStep23(
    dto: SaveBuildStep23Dto,
    bmdsId: number,
  ): Promise<BuildStep23> {
    let buildStep23 = await this.buildStep23Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep23) {
      buildStep23 = new BuildStep23();
    }

    Object.assign(buildStep23, dto);
    buildStep23.bmdsId = bmdsId;
    return await this.buildStep23Repository.save(buildStep23);
  }

  async saveBuildStep24(
    dto: SaveBuildStep24Dto,
    bmdsId: number,
  ): Promise<BuildStep24> {
    let buildStep24 = await this.buildStep24Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep24) {
      buildStep24 = new BuildStep24();
    }

    Object.assign(buildStep24, dto);
    buildStep24.bmdsId = bmdsId;
    return await this.buildStep24Repository.save(buildStep24);
  }

  async saveBuildStep25(
    dto: SaveBuildStep25Dto,
    bmdsId: number,
  ): Promise<BuildStep25> {
    let buildStep25 = await this.buildStep25Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep25) {
      buildStep25 = new BuildStep25();
    }

    Object.assign(buildStep25, dto);
    buildStep25.bmdsId = bmdsId;
    return await this.buildStep25Repository.save(buildStep25);
  }

  async saveBuildStep31(
    dto: SaveBuildStep31Dto,
    bmdsId: number,
  ): Promise<BuildStep31> {
    let buildStep31 = await this.buildStep31Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep31) {
      buildStep31 = new BuildStep31();
    }

    Object.assign(buildStep31, dto);
    buildStep31.bmdsId = bmdsId;
    return await this.buildStep31Repository.save(buildStep31);
  }

  async saveBuildStep32(
    dto: SaveBuildStep32Dto,
    bmdsId: number,
  ): Promise<BuildStep32> {
    let buildStep32 = await this.buildStep32Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep32) {
      buildStep32 = new BuildStep32();
    }

    Object.assign(buildStep32, dto);
    buildStep32.bmdsId = bmdsId;
    return await this.buildStep32Repository.save(buildStep32);
  }

  async saveBuildStep33(
    dto: SaveBuildStep33Dto,
    bmdsId: number,
  ): Promise<BuildStep33> {
    let buildStep33 = await this.buildStep33Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep33) {
      buildStep33 = new BuildStep33();
    }

    Object.assign(buildStep33, dto);
    buildStep33.bmdsId = bmdsId;
    return await this.buildStep33Repository.save(buildStep33);
  }

  async saveBuildStep34(
    dtos: SaveBuildStep34Dto[],
    bmdsId: number,
  ): Promise<BuildStep34[]> {
    const buildStep34s: BuildStep34[] = [];

    for (const dto of dtos) {
      let buildStep34: BuildStep34;

      if (dto.id) {
        buildStep34 = await this.buildStep34Repository.findOne({
          where: { id: dto.id },
        });
        if (!buildStep34) {
          throw new NotFoundException(
            `BuildStep34 with ID "${dto.id}" not found.`,
          );
        }
      } else {
        buildStep34 = new BuildStep34();
        if (bmdsId) {
          buildStep34.bmdsId = bmdsId;
        }
      }

      Object.assign(buildStep34, dto);
      buildStep34s.push(buildStep34);
    }

    console.log(buildStep34s);

    return await this.buildStep34Repository.save(buildStep34s);
  }

  async saveBuildStep34_2(
    dtos: SaveBuildStep34_2Dto[],
    bmdsId: number,
  ): Promise<BuildStep34_2[]> {
    const buildStep34s_2: BuildStep34_2[] = [];

    for (const dto of dtos) {
      let buildStep34_2: BuildStep34_2;

      if (dto.id) {
        buildStep34_2 = await this.buildStep34_2Repository.findOne({
          where: { id: dto.id },
        });
        if (!buildStep34_2) {
          throw new NotFoundException(
            `BuildStep34 with ID "${dto.id}" not found.`,
          );
        }
      } else {
        buildStep34_2 = new BuildStep34();
        if (bmdsId) {
          buildStep34_2.bmdsId = bmdsId;
        }
      }

      Object.assign(buildStep34_2, dto);
      buildStep34s_2.push(buildStep34_2);
    }

    return await this.buildStep34_2Repository.save(buildStep34s_2);
  }

  async saveBuildStep35(
    dtos: SaveBuildStep35Dto[],
    bmdsId: number,
  ): Promise<BuildStep35[]> {
    const buildStep35s: BuildStep35[] = [];

    for (const dto of dtos) {
      let buildStep35: BuildStep35;

      if (dto.id) {
        buildStep35 = await this.buildStep35Repository.findOne({
          where: { id: dto.id },
        });
        if (!buildStep35) {
          throw new NotFoundException(
            `BuildStep35 with ID "${dto.id}" not found.`,
          );
        }
      } else {
        buildStep35 = new BuildStep35();
        if (bmdsId) {
          buildStep35.bmdsId = bmdsId;
        }
      }

      Object.assign(buildStep35, dto);
      buildStep35s.push(buildStep35);
    }

    return await this.buildStep35Repository.save(buildStep35s);
  }

  async saveBuildStep35One(
    dto: SaveBuildStep35OneDto,
    bmdsId: number,
  ): Promise<BuildStep35One> {
    let buildStep35One = await this.buildStep35OneRepository.findOne({
      where: { bmdsId },
    });
    if (!buildStep35One) {
      buildStep35One = new BuildStep35One();
    }
    Object.assign(buildStep35One, dto);
    buildStep35One.bmdsId = bmdsId;
    return await this.buildStep35OneRepository.save(buildStep35One);
  }

  async saveBuildStep36(
    dto: SaveBuildStep36Dto,
    bmdsId: number,
  ): Promise<BuildStep36> {
    let buildStep36 = await this.buildStep36Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep36) {
      buildStep36 = new BuildStep36();
    }
    Object.assign(buildStep36, dto);
    buildStep36.bmdsId = bmdsId;
    return await this.buildStep36Repository.save(buildStep36);
  }

  async saveBuildStep37(
    dto: SaveBuildStep37Dto,
    bmdsId: number,
  ): Promise<BuildStep37> {
    let buildStep37 = await this.buildStep37Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep37) {
      buildStep37 = new BuildStep37();
    }
    Object.assign(buildStep37, dto);
    buildStep37.bmdsId = bmdsId;
    console.log(buildStep37);
    return await this.buildStep37Repository.save(buildStep37);
  }

  // async saveBuildStep37AndPromotions(
  //   buildStep37Dto: SaveBuildStep37Dto,
  //   promotionDtos: SavePromotionDto[],
  //   bmdsId?: number,
  // ): Promise<{ buildStep37: BuildStep37; promotions: Promotion[] }> {
  //   // BuildStep37 저장 로직
  //   let buildStep37 = await this.buildStep37Repository.findOne({
  //     where: { bmdsId },
  //   });
  //   if (!buildStep37) {
  //     buildStep37 = new BuildStep37();
  //   }
  //   Object.assign(buildStep37, buildStep37Dto);
  //   buildStep37.bmdsId = bmdsId;
  //   await this.buildStep37Repository.save(buildStep37);

  //   // Promotions 저장 로직
  //   const promotions: Promotion[] = [];
  //   for (const dto of promotionDtos) {
  //     let promotion: Promotion;
  //     if (dto.id) {
  //       promotion = await this.promotionRepository.findOne({
  //         where: { id: dto.id },
  //       });
  //       if (!promotion) {
  //         throw new NotFoundException(
  //           `Promotion with ID "${dto.id}" not found.`,
  //         );
  //       }
  //     } else {
  //       promotion = new Promotion();
  //       promotion.bmdsId = bmdsId;
  //     }
  //     Object.assign(promotion, dto);
  //     promotions.push(promotion);
  //   }
  //   await this.promotionRepository.save(promotions);

  //   return { buildStep37, promotions };
  // }

  async saveBuildStep41(
    dto: SaveBuildStep41Dto,
    bmdsId: number,
  ): Promise<BuildStep41> {
    let buildStep41 = await this.buildStep41Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep41) {
      buildStep41 = new BuildStep41();
    }
    Object.assign(buildStep41, dto);
    buildStep41.bmdsId = bmdsId;
    return await this.buildStep41Repository.save(buildStep41);
  }

  async saveBuildStep42(file: any, bmdsId: number): Promise<BuildStep42> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);

    if (uploadResult) {
      const newImgUrl = `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      let buildStep42 = await this.buildStep42Repository.findOne({
        where: { bmdsId },
      });
      if (!buildStep42) {
        buildStep42 = new BuildStep42();
      }
      buildStep42.imgUrl = newImgUrl;
      buildStep42.bmdsId = bmdsId;
      return await this.buildStep42Repository.save(buildStep42);
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }

  async saveBuildStep42Memo(
    dto: SaveBuildStep42Dto,
    bmdsId: number,
  ): Promise<void> {
    const buildStep42 = await this.buildStep42Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep42) {
      throw new NotFoundException(`BuildStep43 with ID "${bmdsId}" not found.`);
    }
    buildStep42.memo = dto.memo;
    await this.buildStep42Repository.save(buildStep42);
  }

  async saveBuildStep43(
    dto: SaveBuildStep43Dto,
    bmdsId: number,
  ): Promise<BuildStep43> {
    let buildStep43 = await this.buildStep43Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep43) {
      buildStep43 = new BuildStep43();
    }
    Object.assign(buildStep43, dto);
    buildStep43.bmdsId = bmdsId;
    return await this.buildStep43Repository.save(buildStep43);
  }

  async saveBuildStep44(
    dto: SaveBuildStep44Dto,
    bmdsId: number,
  ): Promise<BuildStep44> {
    let buildStep44 = await this.buildStep44Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep44) {
      buildStep44 = new BuildStep44();
    }
    Object.assign(buildStep44, dto);
    buildStep44.bmdsId = bmdsId;
    return await this.buildStep44Repository.save(buildStep44);
  }

  async saveBuildStep51(
    dto: SaveBuildStep51Dto,
    bmdsId: number,
  ): Promise<BuildStep51> {
    let buildStep51 = await this.buildStep51Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep51) {
      buildStep51 = new BuildStep51();
    }
    Object.assign(buildStep51, dto);
    buildStep51.bmdsId = bmdsId;
    return await this.buildStep51Repository.save(buildStep51);
  }

  async saveBuildStep52(
    file: any,
    bmdsId: number,
    dto: SaveBuildStep52Dto,
  ): Promise<BuildStep52> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);

    if (uploadResult) {
      const newImgUrl = `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      let buildStep52 = await this.buildStep52Repository.findOne({
        where: { bmdsId },
      });
      if (!buildStep52) {
        buildStep52 = new BuildStep52();
      }
      buildStep52.pathUrl = newImgUrl;
      buildStep52.bmdsId = bmdsId;
      buildStep52.title = dto.title;
      return await this.buildStep52Repository.save(buildStep52);
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }
  async saveBuildStep52Memo(
    dto: SaveBuildStep52Dto,
    bmdsId: number,
  ): Promise<void> {
    const buildStep52 = await this.buildStep52Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep52) {
      throw new NotFoundException(`BuildStep43 with ID "${bmdsId}" not found.`);
    }
    buildStep52.memo = dto.memo;
    await this.buildStep52Repository.save(buildStep52);
  }
  async saveBuildStep53(
    file: any,
    bmdsId: number,
    dto: SaveBuildStep53Dto,
  ): Promise<BuildStep53> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);

    if (uploadResult) {
      const newImgUrl = `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      let buildStep53 = await this.buildStep53Repository.findOne({
        where: { bmdsId },
      });
      if (!buildStep53) {
        buildStep53 = new BuildStep53();
      }
      buildStep53.pathUrl = newImgUrl;
      buildStep53.bmdsId = bmdsId;
      buildStep53.title = dto.title;
      return await this.buildStep53Repository.save(buildStep53);
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }
  async saveBuildStep53Memo(
    dto: SaveBuildStep53Dto,
    bmdsId: number,
  ): Promise<void> {
    const buildStep53 = await this.buildStep53Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep53) {
      throw new NotFoundException(`BuildStep53 with ID "${bmdsId}" not found.`);
    }
    buildStep53.memo = dto.memo;
    await this.buildStep53Repository.save(buildStep53);
  }
  async saveBuildStep54(
    file: any,
    bmdsId: number,
    dto: SaveBuildStep54Dto,
  ): Promise<BuildStep54> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);
    if (uploadResult) {
      const newImgUrl = `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      let buildStep54 = await this.buildStep54Repository.findOne({
        where: { bmdsId },
      });
      if (!buildStep54) {
        buildStep54 = new BuildStep54();
      }
      buildStep54.pathUrl = newImgUrl;
      buildStep54.bmdsId = bmdsId;
      buildStep54.title = dto.title;
      return await this.buildStep54Repository.save(buildStep54);
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }
  async saveBuildStep54Memo(
    dto: SaveBuildStep54Dto,
    bmdsId: number,
  ): Promise<void> {
    const buildStep54 = await this.buildStep54Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep54) {
      throw new NotFoundException(`BuildStep54 with ID "${bmdsId}" not found.`);
    }
    buildStep54.memo = dto.memo;
    await this.buildStep54Repository.save(buildStep54);
  }
  async saveBuildStep55(
    dto: SaveBuildStep55Dto,
    bmdsId: number,
  ): Promise<BuildStep55> {
    let buildStep55 = await this.buildStep55Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep55) {
      buildStep55 = new BuildStep55();
    }
    Object.assign(buildStep55, dto);
    buildStep55.bmdsId = bmdsId;
    return await this.buildStep55Repository.save(buildStep55);
  }

  async saveBuildStep56(
    dto: SaveBuildStep56Dto,
    bmdsId: number,
  ): Promise<BuildStep56> {
    let buildStep56 = await this.buildStep56Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep56) {
      buildStep56 = new BuildStep56();
    }

    console.log('dto', dto);

    Object.assign(buildStep56, dto);
    buildStep56.bmdsId = bmdsId;

    console.log('buildStep56', buildStep56);

    return await this.buildStep56Repository.save(buildStep56);
  }

  async saveBuildStep57(
    dto: SaveBuildStep57Dto,
    bmdsId: number,
  ): Promise<BuildStep57> {
    let buildStep57 = await this.buildStep57Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep57) {
      buildStep57 = new BuildStep57();
    }
    Object.assign(buildStep57, dto);
    buildStep57.bmdsId = bmdsId;
    return await this.buildStep57Repository.save(buildStep57);
  }

  async saveBuildStep58(
    dto: SaveBuildStep58Dto,
    bmdsId: number,
  ): Promise<BuildStep58> {
    let buildStep58 = await this.buildStep58Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep58) {
      buildStep58 = new BuildStep58();
    }
    Object.assign(buildStep58, dto);
    buildStep58.bmdsId = bmdsId;
    return await this.buildStep58Repository.save(buildStep58);
  }

  async saveBuildStep59(
    dto: SaveBuildStep59Dto,
    bmdsId: number,
  ): Promise<BuildStep59> {
    let buildStep59 = await this.buildStep59Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep59) {
      buildStep59 = new BuildStep59();
    }
    Object.assign(buildStep59, dto);
    buildStep59.bmdsId = bmdsId;
    return await this.buildStep59Repository.save(buildStep59);
  }

  async saveBuildStep60(file: any, bmdsId: number): Promise<BuildStep60> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);
    if (uploadResult) {
      const newImgUrl = `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      let buildStep60 = await this.buildStep60Repository.findOne({
        where: { bmdsId },
      });
      if (!buildStep60) {
        buildStep60 = new BuildStep60();
      }
      buildStep60.pathUrl = newImgUrl;
      buildStep60.bmdsId = bmdsId;
      return await this.buildStep60Repository.save(buildStep60);
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }
  async saveBuildStep60Memo(
    dto: SaveBuildStep60Dto,
    bmdsId: number,
  ): Promise<void> {
    const buildStep60 = await this.buildStep60Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep60) {
      throw new NotFoundException(`BuildStep54 with ID "${bmdsId}" not found.`);
    }
    buildStep60.memo = dto.memo;
    await this.buildStep60Repository.save(buildStep60);
  }
  async saveBuildStep61(
    dto: SaveBuildStep61Dto,
    bmdsId: number,
  ): Promise<BuildStep61> {
    let buildStep61 = await this.buildStep61Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep61) {
      buildStep61 = new BuildStep61();
    }
    Object.assign(buildStep61, dto);
    buildStep61.bmdsId = bmdsId;
    return await this.buildStep61Repository.save(buildStep61);
  }
  // async saveBuildStep62(
  //   files: any[],
  //   bmdsId: number,
  //   dto: SaveBuildStep62Dto,
  // ): Promise<BuildStep62> {
  //   const s3 = new AWS.S3();
  //   const bucketName = 'dev.new.bmds';
  //   const urls = [];

  //   for (const file of files) {
  //     const uploadResult = await this.uploadToS3(s3, file, bucketName);
  //     if (!uploadResult) {
  //       throw new InternalServerErrorException(
  //         'S3에 이미지 업로드 중 오류 발생',
  //       );
  //     }
  //     urls.push(`https://${bucketName}.s3.amazonaws.com/${uploadResult.Key}`);
  //   }

  //   let buildStep62 = await this.buildStep62Repository.findOne({
  //     where: { bmdsId },
  //   });
  //   if (!buildStep62) {
  //     buildStep62 = new BuildStep62();
  //   }

  //   // 파일 URL과 DTO 데이터를 엔티티에 할당
  //   Object.assign(buildStep62, dto, {
  //     bmdsId,
  //     pathUrl1: urls[0], // 예시로 첫 번째 URL 할당
  //     pathUrl2: urls[1], // 두 번째 URL 할당, 이하 동일
  //     pathUrl3: urls[2],
  //     pathUrl4: urls[3],
  //     pathUrl5: urls[4],
  //     pathUrl6: urls[5],
  //     pathUrl7: urls[6],
  //     pathUrl8: urls[7],
  //     // ...
  //   });

  //   return await this.buildStep62Repository.save(buildStep62);
  // }

  async saveBuildStep62(
    dto: SaveBuildStep62Dto,
    bmdsId: number,
  ): Promise<BuildStep62> {
    let buildStep62 = await this.buildStep62Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep62) {
      buildStep62 = new BuildStep62();
    }
    Object.assign(buildStep62, dto);
    buildStep62.bmdsId = bmdsId;
    return await this.buildStep62Repository.save(buildStep62);
  }

  // saveBuildStep62()를 쪼개서 사용한 메서드
  async saveBuildStep62_1(file: any, bmdsId: number): Promise<BuildStep62> {
    AWS.config.update({
      accessKeyId: 'AKIASEB4FW67ZAW624GJ',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
    const s3 = new AWS.S3(); // S3 객체 초기화
    const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
    // 이미지를 S3에 업로드하고 그 결과를 가져옵니다.
    const uploadResult = await this.uploadToS3(s3, file, bucketName);
    if (uploadResult) {
      const newImgUrl = `https://d214x0c21df4fw.cloudfront.net/${uploadResult.Key}`;
      let buildStep62 = await this.buildStep62Repository.findOne({
        where: { bmdsId },
      });
      if (!buildStep62) {
        buildStep62 = new BuildStep62();
      }
      buildStep62.pathUrl1 = newImgUrl;
      buildStep62.fileKey = uploadResult.Key;
      buildStep62.fileName62 = file.originalname;
      buildStep62.bmdsId = bmdsId;
      return await this.buildStep62Repository.save(buildStep62);
    } else {
      throw new InternalServerErrorException('S3에 이미지 업로드 중 오류 발생');
    }
  }

  async saveBuildStep63(
    dto: SaveBuildStep63Dto,
    bmdsId: number,
  ): Promise<BuildStep63> {
    let buildStep63 = await this.buildStep63Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep63) {
      buildStep63 = new BuildStep63();
    }
    Object.assign(buildStep63, dto);
    buildStep63.bmdsId = bmdsId;
    return await this.buildStep63Repository.save(buildStep63);
  }

  async saveBuildStep71(
    dto: SaveBuildStep71Dto,
    bmdsId: number,
  ): Promise<BuildStep71> {
    let buildStep71 = await this.buildStep71Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep71) {
      buildStep71 = new BuildStep71();
    }
    Object.assign(buildStep71, dto);
    buildStep71.bmdsId = bmdsId;
    return await this.buildStep71Repository.save(buildStep71);
  }

  async saveBuildStep72(
    dto: SaveBuildStep72Dto,
    bmdsId: number,
  ): Promise<BuildStep72> {
    let buildStep72 = await this.buildStep72Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep72) {
      buildStep72 = new BuildStep72();
    }
    Object.assign(buildStep72, dto);
    buildStep72.bmdsId = bmdsId;
    return await this.buildStep72Repository.save(buildStep72);
  }

  async saveBuildStep73(
    dto: SaveBuildStep73Dto,
    bmdsId: number,
  ): Promise<BuildStep73> {
    let buildStep73 = await this.buildStep73Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep73) {
      buildStep73 = new BuildStep73();
    }
    Object.assign(buildStep73, dto);
    buildStep73.bmdsId = bmdsId;
    return await this.buildStep73Repository.save(buildStep73);
  }

  async saveBuildStep74(
    dto: SaveBuildStep74Dto,
    bmdsId: number,
  ): Promise<BuildStep74> {
    let buildStep74 = await this.buildStep74Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep74) {
      buildStep74 = new BuildStep74();
    }
    Object.assign(buildStep74, dto);
    buildStep74.bmdsId = bmdsId;
    return await this.buildStep74Repository.save(buildStep74);
  }

  async uploadToS3(
    s3: AWS.S3,
    file: any,
    bucketName: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    // 파일명 인코딩: 한글 파일명을 안전하게 처리
    const encodedFileName = encodeURIComponent(file.originalname);
    console.log(encodedFileName);

    // S3 업로드 옵션 설정
    const uploadOptions = {
      Bucket: bucketName,
      Key: `${uuidv4()}_${encodedFileName}`,
      Body: file.buffer,
      ACL: 'public-read', // 필요한 권한을 설정합니다.
      ContentType: file.mimetype,
      // ContentDisposition: `attachment; filename="${file.originalname}"`,
    };
    console.log(uploadOptions);
    // S3에 파일을 업로드하고 그 결과를 반환합니다.
    return s3.upload(uploadOptions).promise();
  }

  async getBuildStep11(bmdsId: number): Promise<BuildStep11> {
    const buildStep11 = await this.buildStep11Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep11) {
      throw new NotFoundException(`BuildStep11 with ID "${bmdsId}" not found.`);
    }
    return buildStep11;
  }

  async getBuildStep12(bmdsId: number): Promise<BuildStep12> {
    const buildStep12 = await this.buildStep12Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep12) {
      throw new NotFoundException(`BuildStep12 with ID "${bmdsId}" not found.`);
    }
    return buildStep12;
  }

  async getBuildStep13(bmdsId: number): Promise<BuildStep13> {
    const buildStep13 = await this.buildStep13Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep13) {
      throw new NotFoundException(`BuildStep13 with ID "${bmdsId}" not found.`);
    }
    return buildStep13;
  }

  async getBuildStep14(bmdsId: number): Promise<BuildStep14> {
    const buildStep14 = await this.buildStep14Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep14) {
      throw new NotFoundException(`BuildStep14 with ID "${bmdsId}" not found.`);
    }
    return buildStep14;
  }

  async getBuildStep15(bmdsId: number): Promise<BuildStep15> {
    const buildStep15 = await this.buildStep15Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep15) {
      throw new NotFoundException(`BuildStep15 with ID "${bmdsId}" not found.`);
    }
    return buildStep15;
  }

  async getBuildStep21(bmdsId: number): Promise<BuildStep21> {
    const buildStep21 = await this.buildStep21Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep21) {
      throw new NotFoundException(`BuildStep21 with ID "${bmdsId}" not found.`);
    }
    return buildStep21;
  }

  async getBuildStep22(bmdsId: number): Promise<BuildStep22> {
    const buildStep22 = await this.buildStep22Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep22) {
      throw new NotFoundException(`BuildStep22 with ID "${bmdsId}" not found.`);
    }
    return buildStep22;
  }

  async getBuildStep23(bmdsId: number): Promise<BuildStep23> {
    const buildStep23 = await this.buildStep23Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep23) {
      throw new NotFoundException(`BuildStep23 with ID "${bmdsId}" not found.`);
    }
    return buildStep23;
  }

  async getBuildStep24(bmdsId: number): Promise<BuildStep24> {
    const buildStep24 = await this.buildStep24Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep24) {
      throw new NotFoundException(`BuildStep24 with ID "${bmdsId}" not found.`);
    }
    return buildStep24;
  }

  async getBuildStep25(bmdsId: number): Promise<BuildStep25> {
    const buildStep25 = await this.buildStep25Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep25) {
      throw new NotFoundException(`BuildStep25 with ID "${bmdsId}" not found.`);
    }
    return buildStep25;
  }

  async getBuildStep31(bmdsId: number): Promise<BuildStep31> {
    const buildStep31 = await this.buildStep31Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep31) {
      throw new NotFoundException(`BuildStep31 with ID "${bmdsId}" not found.`);
    }
    return buildStep31;
  }

  async getBuildStep32(bmdsId: number): Promise<BuildStep32> {
    const buildStep32 = await this.buildStep32Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep32) {
      throw new NotFoundException(`BuildStep32 with ID "${bmdsId}" not found.`);
    }
    return buildStep32;
  }

  async getBuildStep33(bmdsId: number): Promise<BuildStep33> {
    const buildStep33 = await this.buildStep33Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep33) {
      throw new NotFoundException(`BuildStep33 with ID "${bmdsId}" not found.`);
    }
    return buildStep33;
  }

  async getBuildStep34(bmdsId: number): Promise<BuildStep34[]> {
    const buildStep34 = await this.buildStep34Repository.find({
      where: { bmdsId },
    });
    if (!buildStep34) {
      throw new NotFoundException(`BuildStep34 with ID "${bmdsId}" not found.`);
    }
    return buildStep34;
  }

  async getBuildStep34_2(bmdsId: number): Promise<BuildStep34_2[]> {
    const buildStep34_2 = await this.buildStep34_2Repository.find({
      where: { bmdsId },
    });
    if (!buildStep34_2) {
      throw new NotFoundException(`BuildStep34 with ID "${bmdsId}" not found.`);
    }
    return buildStep34_2;
  }

  async getBuildStep35(bmdsId: number): Promise<BuildStep35[]> {
    const buildStep35 = await this.buildStep35Repository.find({
      where: { bmdsId },
    });
    if (!buildStep35) {
      throw new NotFoundException(`BuildStep35 with ID "${bmdsId}" not found.`);
    }
    return buildStep35;
  }

  async getBuildStep35One(bmdsId: number): Promise<BuildStep35One> {
    const buildStep35One = await this.buildStep35OneRepository.findOne({
      where: { bmdsId },
    });
    if (!buildStep35One) {
      throw new NotFoundException(`BuildStep35 with ID "${bmdsId}" not found.`);
    }
    return buildStep35One;
  }

  async getBuildStep36(bmdsId: number): Promise<BuildStep36> {
    const buildStep36 = await this.buildStep36Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep36) {
      throw new NotFoundException(`BuildStep36 with ID "${bmdsId}" not found.`);
    }
    return buildStep36;
  }

  async getBuildStep37(bmdsId: number): Promise<BuildStep37> {
    const buildStep37 = await this.buildStep37Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep37) {
      throw new NotFoundException(`BuildStep37 with ID "${bmdsId}" not found.`);
    }
    return buildStep37;
  }

  async getBuildStep41(bmdsId: number): Promise<BuildStep41> {
    const buildStep41 = await this.buildStep41Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep41) {
      throw new NotFoundException(`BuildStep41 with ID "${bmdsId}" not found.`);
    }
    return buildStep41;
  }

  async getBuildStep42(bmdsId: number): Promise<BuildStep42> {
    const buildStep42 = await this.buildStep42Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep42) {
      throw new NotFoundException(`BuildStep42 with ID "${bmdsId}" not found.`);
    }
    return buildStep42;
  }

  async getBuildStep43(bmdsId: number): Promise<BuildStep43> {
    const buildStep43 = await this.buildStep43Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep43) {
      throw new NotFoundException(`BuildStep43 with ID "${bmdsId}" not found.`);
    }
    return buildStep43;
  }

  async getBuildStep44(bmdsId: number): Promise<BuildStep44> {
    const buildStep44 = await this.buildStep44Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep44) {
      throw new NotFoundException(`BuildStep44 with ID "${bmdsId}" not found.`);
    }
    return buildStep44;
  }

  async getBuildStep51(bmdsId: number): Promise<BuildStep51> {
    const buildStep51 = await this.buildStep51Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep51) {
      throw new NotFoundException(`BuildStep51 with ID "${bmdsId}" not found.`);
    }
    return buildStep51;
  }

  async getBuildStep52(bmdsId: number): Promise<BuildStep52> {
    const buildStep52 = await this.buildStep52Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep52) {
      throw new NotFoundException(`BuildStep52 with ID "${bmdsId}" not found.`);
    }
    return buildStep52;
  }

  async getBuildStep53(bmdsId: number): Promise<BuildStep53> {
    const buildStep53 = await this.buildStep53Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep53) {
      throw new NotFoundException(`BuildStep53 with ID "${bmdsId}" not found.`);
    }
    return buildStep53;
  }

  async getBuildStep54(bmdsId: number): Promise<BuildStep54> {
    const buildStep54 = await this.buildStep54Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep54) {
      throw new NotFoundException(`BuildStep54 with ID "${bmdsId}" not found.`);
    }
    return buildStep54;
  }

  async getBuildStep55(bmdsId: number): Promise<BuildStep55> {
    const buildStep55 = await this.buildStep55Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep55) {
      throw new NotFoundException(`BuildStep55 with ID "${bmdsId}" not found.`);
    }
    return buildStep55;
  }

  async getBuildStep56(bmdsId: number): Promise<BuildStep56> {
    const buildStep56 = await this.buildStep56Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep56) {
      throw new NotFoundException(`BuildStep56 with ID "${bmdsId}" not found.`);
    }
    return buildStep56;
  }

  async getBuildStep57(bmdsId: number): Promise<BuildStep57> {
    const buildStep57 = await this.buildStep57Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep57) {
      throw new NotFoundException(`BuildStep57 with ID "${bmdsId}" not found.`);
    }
    return buildStep57;
  }

  async getBuildStep58(bmdsId: number): Promise<BuildStep58> {
    const buildStep58 = await this.buildStep58Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep58) {
      throw new NotFoundException(`BuildStep58 with ID "${bmdsId}" not found.`);
    }
    return buildStep58;
  }

  async getBuildStep59(bmdsId: number): Promise<BuildStep59> {
    const buildStep59 = await this.buildStep59Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep59) {
      throw new NotFoundException(`BuildStep59 with ID "${bmdsId}" not found.`);
    }
    return buildStep59;
  }

  async getBuildStep60(bmdsId: number): Promise<BuildStep60> {
    const buildStep60 = await this.buildStep60Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep60) {
      throw new NotFoundException(`BuildStep60 with ID "${bmdsId}" not found.`);
    }
    return buildStep60;
  }

  async getBuildStep61(bmdsId: number): Promise<BuildStep61> {
    const buildStep61 = await this.buildStep61Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep61) {
      throw new NotFoundException(`BuildStep61 with ID "${bmdsId}" not found.`);
    }
    return buildStep61;
  }

  async getBuildStep62(bmdsId: number): Promise<BuildStep62> {
    const buildStep62 = await this.buildStep62Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep62) {
      throw new NotFoundException(`BuildStep62 with ID "${bmdsId}" not found.`);
    }
    return buildStep62;
  }

  async getBuildStep63(bmdsId: number): Promise<BuildStep63> {
    const buildStep63 = await this.buildStep63Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep63) {
      throw new NotFoundException(`BuildStep63 with ID "${bmdsId}" not found.`);
    }
    return buildStep63;
  }

  async getBuildStep71(bmdsId: number): Promise<BuildStep71> {
    const buildStep71 = await this.buildStep71Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep71) {
      throw new NotFoundException(`BuildStep71 with ID "${bmdsId}" not found.`);
    }
    return buildStep71;
  }

  async getBuildStep72(bmdsId: number): Promise<BuildStep72> {
    const buildStep72 = await this.buildStep72Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep72) {
      throw new NotFoundException(`BuildStep72 with ID "${bmdsId}" not found.`);
    }
    return buildStep72;
  }

  async getBuildStep73(bmdsId: number): Promise<BuildStep73> {
    const buildStep73 = await this.buildStep73Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep73) {
      throw new NotFoundException(`BuildStep73 with ID "${bmdsId}" not found.`);
    }
    return buildStep73;
  }

  async getBuildStep74(bmdsId: number): Promise<BuildStep74> {
    const buildStep74 = await this.buildStep74Repository.findOne({
      where: { bmdsId },
    });
    if (!buildStep74) {
      throw new NotFoundException(`BuildStep74 with ID "${bmdsId}" not found.`);
    }
    return buildStep74;
  }

  async getReview(): Promise<BuildUpReview[]> {
    const betaBmdsReview = await this.buildReviewRepository.find();
    return betaBmdsReview;
  }

  async getOneReview(buildId: number): Promise<BuildUpReview> {
    const betaBmdsReview = await this.buildReviewRepository.findOne({
      where: { buildId },
    });
    return betaBmdsReview;
  }

  async saveReview(
    buildId: number,
    dto: SaveReviewDto,
  ): Promise<BuildUpReview> {
    let betaBmdsReview = await this.buildReviewRepository.findOne({
      where: { buildId },
    });

    if (betaBmdsReview) {
      // 리뷰가 이미 존재하면 업데이트
      betaBmdsReview.score = dto.score;
      betaBmdsReview.content = dto.content;
    } else {
      // 새 리뷰 생성
      betaBmdsReview = new BuildUpReview();
      betaBmdsReview.buildId = buildId;
      betaBmdsReview.score = dto.score;
      betaBmdsReview.content = dto.content;
    }

    // 리뷰 저장
    return this.buildReviewRepository.save(betaBmdsReview);
  }
  async getBMAll(): Promise<any> {
    const buildUpBmdsWithRelations = await this.buildUpBmdsRepository
      .createQueryBuilder('buildUpBmds')
      .leftJoinAndSelect('buildUpBmds.user', 'user')
      .select(['buildUpBmds', 'user.email', 'user.name'])
      .getMany();

    return buildUpBmdsWithRelations;
  }

  // !superVisor 관련
  // 소속그룹 전체 bmds 리스트 조회
  async getBuildUpBmdsListBySupervisor(
    id: number,
    currentPage: number,
    pageSize: number,
  ): Promise<{ data: BuildUpBmds[]; count: number }> {
    const superVisor = await this.userRepository.findOne({
      where: { id },
    });

    checkUserRoles(superVisor, ['s-supervisor', 'g-supervisor']);
    const affiliationGroup = superVisor.affiliationGroup;
    const userIdList = await this.userRepository.find({
      where: { affiliationGroup },
    });
    const userIds = userIdList.map((user) => user.id);

    const offset = (currentPage - 1) * pageSize;

    const buildUpBmdsList = await this.buildUpBmdsRepository
      .createQueryBuilder('buildUpBmds')
      .leftJoinAndSelect('buildUpBmds.user', 'user')
      .where('buildUpBmds.userId IN (:...userIds)', { userIds })
      .select(['buildUpBmds', 'user.id', 'user.email', 'user.name'])
      .skip(offset)
      .take(pageSize)
      .getMany();

    const count = await this.buildUpBmdsRepository
      .createQueryBuilder('buildUpBmds')
      .where('buildUpBmds.userId IN (:...userIds)', { userIds })
      .getCount();

    return { data: buildUpBmdsList, count };
  }
}
