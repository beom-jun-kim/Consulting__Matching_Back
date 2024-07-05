/*eslint-disable */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LoginHistory } from './history.entity';
import { MailerService } from './mailer.service';
import { PaymentHistory } from './paymentHistory.entity';
import { PaymentHistoryRepository } from './paymentHistory.repository';
import { Match } from 'src/match/entities/match.entity';
import { TagList } from 'src/match/entities/tagList.entity';
import { GroupCode } from './groupCode.entity';
import { Portone } from 'src/portone/portone.entity';
import { ChoiceTags } from 'src/mentoringapp/entities/choicetags.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // jwt를 사용하겠단 의미
    JwtModule.registerAsync({
      //비동기적으로 JWT를 구성, useFactory 함수를 사용하여 JWT 모듈을 동적으로 구성
      useFactory: () => ({
        //프로바이더를 생성할 때, 외부 서비스에 연결해야 하거나 비동기 작업을 수행해야 하는 경우에 사용
        secret: Buffer.from('Secret1234', 'base64'),
        signOptions: {
          expiresIn: 3600, // 토큰의 만료 시간 (초 단위)
        },
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      LoginHistory,
      PaymentHistory,
      GroupCode,
      ChoiceTags,
      Portone,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    MailerService,
    PaymentHistoryRepository,
    Match,
    TagList,
    GroupCode,
    Portone,
    ChoiceTags,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
