import { Module } from '@nestjs/common';
import { PortoneService } from './service/portone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { PortoneController } from './controller/portone.controller';
import { Portone } from './portone.entity';

@Module({
  controllers: [PortoneController],
  providers: [PortoneService],
  imports: [TypeOrmModule.forFeature([Portone, User])],
})
export class PortoneModule {}
