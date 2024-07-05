/* eslint-disable  */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Notice } from 'src/notice/notice.entity';
import { Faq } from 'src/faq/faq.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { Video } from 'src/video/video.entity';
import { LoginHistory } from 'src/auth/history.entity';
import { Qna } from 'src/qna/qna.entity';
import { PaymentHistory } from 'src/auth/paymentHistory.entity';

import { BmdsCoupon } from 'src/coupon/entities/coupon.entity';
import { NoticeImg } from 'src/notice/noticeImg.entity';
import { MeraklPay } from 'src/coupon/entities/merakl_pay.entity';
import { Vouchers } from 'src/coupon/entities/vouchers.entity';
import { BuildStep11 } from 'src/buildup/entities/buildStep11.entity';
import { BuildStep12 } from 'src/buildup/entities/buildStep12.entity';
import { BuildStep13 } from 'src/buildup/entities/buildStep13.entity';
import { BuildStep14 } from 'src/buildup/entities/buildStep14.entity';
import { BuildStep15 } from 'src/buildup/entities/buildStep15.entity';
import { BuildStep21 } from 'src/buildup/entities/buildStep21.entity';
import { BuildStep22 } from 'src/buildup/entities/buildStep22.entity';
import { BuildStep23 } from 'src/buildup/entities/buildStep23.entity';
import { BuildStep24 } from 'src/buildup/entities/buildStep24.entity';
import { BuildStep25 } from 'src/buildup/entities/buildStep25.entity';
import { BuildStep31 } from 'src/buildup/entities/buildStep31.entity';
import { BuildStep32 } from 'src/buildup/entities/buildStep32.entity';
import { BuildStep33 } from 'src/buildup/entities/buildStep33.entity';
import { BuildStep34 } from 'src/buildup/entities/buildStep34.entity';
import { BuildStep35 } from 'src/buildup/entities/buildStep35.entity';
import { BuildStep36 } from 'src/buildup/entities/buildStep36.entity';
import { BuildStep37 } from 'src/buildup/entities/buildStep37.entity';
import { BuildStep41 } from 'src/buildup/entities/buildStep41.entity';
import { BuildStep42 } from 'src/buildup/entities/buildStep42.entity';
import { BuildStep43 } from 'src/buildup/entities/buildStep43.entity';
import { BuildStep44 } from 'src/buildup/entities/buildStep44.entity';
import { BuildStep51 } from 'src/buildup/entities/buildStep51.entity';
import { BuildStep52 } from 'src/buildup/entities/buildStep52.entity';
import { BuildStep53 } from 'src/buildup/entities/buildStep53.entity';
import { BuildStep54 } from 'src/buildup/entities/buildStep54.entity';
import { BuildStep55 } from 'src/buildup/entities/buildStep55.entity';
import { BuildStep56 } from 'src/buildup/entities/buildStep56.entity';
import { BuildStep57 } from 'src/buildup/entities/buildStep57.entity';
import { BuildStep58 } from 'src/buildup/entities/buildStep58.entity';
import { BuildStep59 } from 'src/buildup/entities/buildStep59.entity';
import { BuildStep60 } from 'src/buildup/entities/buildStep60.entity';
import { BuildStep61 } from 'src/buildup/entities/buildStep61.entity';
import { BuildStep62 } from 'src/buildup/entities/buildStep62.entity';
import { BuildStep63 } from 'src/buildup/entities/buildStep63.entity';
import { BuildStep71 } from 'src/buildup/entities/buildStep71.entity';
import { BuildStep72 } from 'src/buildup/entities/buildStep72.entity';
import { BuildStep73 } from 'src/buildup/entities/buildStep73.entity';
import { BuildStep74 } from 'src/buildup/entities/buildStep74.entity';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import { BuildStep34_2 } from 'src/buildup/entities/buildStep34_2.entity';
import { BuildStep35One } from 'src/buildup/entities/buildStep35One.entity';

import { BootPay } from 'src/bootpay/bootpay.entity';

import { BuildUpReview } from 'src/buildup/entities/buildReview.entity';
import { Roadmap } from 'src/roadmap/roadmap.entity';
import { UserRoadmap } from 'src/roadmap/userRoadmap.entity';
import { TagList } from 'src/match/entities/tagList.entity';
import { Match } from 'src/match/entities/match.entity';
import { ConsultingJournal } from 'src/match/entities/consutingJournal.entity';
import { GroupCode } from 'src/auth/groupCode.entity';
import { Portone } from 'src/portone/portone.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  name: 'default',
  host: 'ls-a4006c0d4f42f2022f07fa5ecaf76caba2ae6aea.clgshzmzuhq0.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'dbmasteruser',
  password: ';HTlpfrMSHwj}x<+.!c<36S|ztR5h6NW',
  database: 'dbmaster',
  entities: [
    User,
    Notice,
    Faq,
    Ticket,
    Video,
    LoginHistory,
    Qna,
    PaymentHistory,

    BmdsCoupon,
    NoticeImg,

    MeraklPay,
    Vouchers,
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

    BootPay,
    Portone,

    BuildUpReview,
    Roadmap,
    UserRoadmap,
    TagList,
    Match,
    ConsultingJournal,
    GroupCode,
  ],
  synchronize: false,
  // true값을 주면 애플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성.
};
