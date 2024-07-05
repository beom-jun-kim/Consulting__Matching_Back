/*eslint-disable */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GetIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // IP 주소를 추출합니다.
    const clientIp =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // 요청 객체에 IP 주소를 추가합니다.
    (req as any).clientIp = clientIp;

    // 다음 미들웨어로 넘어갑니다.
    next();
  }
}
