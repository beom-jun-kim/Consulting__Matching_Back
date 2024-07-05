import { Module } from '@nestjs/common';
import { BuildupController } from './controller/buildup.controller';
import { BuildupService } from './service/buildup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildStep11 } from './entities/buildStep11.entity';
import { BuildStep12 } from './entities/buildStep12.entity';
import { BuildStep13 } from './entities/buildStep13.entity';
import { BuildStep14 } from './entities/buildStep14.entity';
import { BuildStep15 } from './entities/buildStep15.entity';
import { BuildStep21 } from './entities/buildStep21.entity';
import { BuildStep22 } from './entities/buildStep22.entity';
import { BuildStep23 } from './entities/buildStep23.entity';
import { BuildStep24 } from './entities/buildStep24.entity';
import { BuildStep25 } from './entities/buildStep25.entity';
import { BuildStep31 } from './entities/buildStep31.entity';
import { BuildStep32 } from './entities/buildStep32.entity';
import { BuildStep33 } from './entities/buildStep33.entity';
import { BuildStep34 } from './entities/buildStep34.entity';
import { BuildStep35 } from './entities/buildStep35.entity';
import { BuildStep36 } from './entities/buildStep36.entity';
import { BuildStep37 } from './entities/buildStep37.entity';
import { BuildStep41 } from './entities/buildStep41.entity';
import { BuildStep42 } from './entities/buildStep42.entity';
import { BuildStep43 } from './entities/buildStep43.entity';
import { BuildStep44 } from './entities/buildStep44.entity';
import { BuildStep51 } from './entities/buildStep51.entity';
import { BuildStep52 } from './entities/buildStep52.entity';
import { BuildStep53 } from './entities/buildStep53.entity';
import { BuildStep54 } from './entities/buildStep54.entity';
import { BuildStep55 } from './entities/buildStep55.entity';
import { BuildStep56 } from './entities/buildStep56.entity';
import { BuildStep57 } from './entities/buildStep57.entity';
import { BuildStep58 } from './entities/buildStep58.entity';
import { BuildStep59 } from './entities/buildStep59.entity';
import { BuildStep60 } from './entities/buildStep60.entity';
import { BuildStep61 } from './entities/buildStep61.entity';
import { BuildStep62 } from './entities/buildStep62.entity';
import { BuildStep63 } from './entities/buildStep63.entity';
import { BuildStep71 } from './entities/buildStep71.entity';
import { BuildStep72 } from './entities/buildStep72.entity';
import { BuildStep73 } from './entities/buildStep73.entity';
import { BuildStep74 } from './entities/buildStep74.entity';
import { BuildUpBmds } from './entities/buildUpBmds.entity';
import { BuildStep34_2 } from './entities/buildStep34_2.entity';
import { BuildStep35One } from './entities/buildStep35One.entity';
import { BuildUpReview } from './entities/buildReview.entity';
import { User } from 'src/auth/user.entity';
import { Portone } from 'src/portone/portone.entity';

@Module({
  controllers: [BuildupController],
  providers: [BuildupService],
  imports: [
    TypeOrmModule.forFeature([
      BuildUpBmds,
      BuildStep11,
      BuildStep12,
      BuildStep13,
      BuildStep14,
      BuildStep15,
      BuildStep21,
      BuildStep22,
      BuildStep23,
      BuildStep24,
      BuildStep25,
      BuildStep31,
      BuildStep32,
      BuildStep33,
      BuildStep34,
      BuildStep34_2,
      BuildStep35,
      BuildStep35One,
      BuildStep36,
      BuildStep37,
      BuildStep41,
      BuildStep42,
      BuildStep43,
      BuildStep44,
      BuildStep51,
      BuildStep52,
      BuildStep53,
      BuildStep54,
      BuildStep55,
      BuildStep56,
      BuildStep57,
      BuildStep58,
      BuildStep59,
      BuildStep60,
      BuildStep61,
      BuildStep62,
      BuildStep63,
      BuildStep71,
      BuildStep72,
      BuildStep73,
      BuildStep74,
      BuildUpReview,
      User,
      Portone,
    ]),
  ],
})
export class BuildupModule {}
