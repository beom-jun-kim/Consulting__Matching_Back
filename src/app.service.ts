import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello() {
    const mongodbUri = this.configService.get<string>('MONGODB_URI');
    const dev = this.configService.get<string>('DEV');
    const secret = this.configService.get<string>('SECRET');
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbUsername = this.configService.get<string>('DB_USERNAME');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const accessKeyId = this.configService.get<string>('ACCESSKEY_ID');
    const secretAccessKey = this.configService.get<string>('SECRETACCESS_KEY');

    return {
      mongodbUri,
      dev,
      secret,
      dbHost,
      dbUsername,
      dbPassword,
      accessKeyId,
      secretAccessKey,
    };
  }
}
