import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://bmds.co.kr',
      'https://wemerakl.com',
      'http://localhost:8080',
      'https://d214x0c21df4fw.cloudfront.net',
      'https://api.iamport.kr',
    ], // 허용할 도메인에 로컬호스트 추가
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: false, // 크로스-도메인 요청 시 사용자 인증이 필요한 경우 true로 설정
  });

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('BMDS')
    .setDescription('BMDS API DOCS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
