/* eslint-disable  */
// auth.middleware.ts
/* eslint-enable camelcase */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const bearerToken =
//       req.headers.authorization && req.headers.authorization.split(' ')[1];
//     const token = bearerToken && JSON.parse(bearerToken).accessToken;

//     // Token을 확인하고, 유효하지 않으면 에러를 던진다.
//     if (!token) {
//       res.status(401).send('Access denied. No token provided.');
//       return;
//     }

//     // Token이 유효하면, 다음 미들웨어나 라우터 핸들러로 이동한다.
//     try {
//       const decoded = jwt.verify(
//         token,
//         Buffer.from(process.env.SECRET, 'base64'),
//       );
//       req.user = decoded;

//       next();
//     } catch (ex) {
//       const decoded = jwt.verify(
//         token,
//         Buffer.from(process.env.SECRET, 'base64'),
//       );

//       res.status(400).send('Invalid token.');
//     }
//   }
// }
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const bearerToken =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    // Bearer 토큰을 JSON으로 파싱하지 않고 직접 사용
    const token = bearerToken;

    // 토큰 유효성 검사
    if (!token) {
      res.status(401).send('Access denied. No token provided.');
      return;
    }

    try {
      const decoded = jwt.verify(token, Buffer.from('Secret1234', 'base64'));

      req.user = decoded;

      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }
}
