/* eslint-disable */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { NoticeModule } from './notice/notice.module';
import { FaqModule } from './faq/faq.module';
import { TicketModule } from './ticket/ticket.module';
import { VideoModule } from './video/video.module';
import { GetIpMiddleware } from './get-ip.middleware';
import { QnaModule } from './qna/qna.module';

import { AdminModule } from './admin/admin.module';
import { AuthenticationMiddleware } from './middleware/auth.middleware';
import { CouponModule } from './coupon/coupon.module';
import { BuildupModule } from './buildup/buildup.module';
import { BootpayModule } from './bootpay/bootpay.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { MatchModule } from './match/match.module';
import { PortoneModule } from './portone/portone.module';
import { MentoringAppModule } from './mentoringapp/mentoringapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRoot({
      ...typeORMConfig,
      logging: true,
    }),

    AuthModule,
    NoticeModule,
    FaqModule,
    TicketModule,
    VideoModule,
    QnaModule,
    AdminModule,
    CouponModule,
    BuildupModule,
    BootpayModule,
    RoadmapModule,
    MatchModule,
    PortoneModule,
    MentoringAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    // admin 경로에 미들웨어 적용
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'api/admin/*', method: RequestMethod.ALL });
    consumer.apply(LoggerMiddleware, GetIpMiddleware).forRoutes('*');

    // mongoose.set('debug', this.isDev);
  }
}
