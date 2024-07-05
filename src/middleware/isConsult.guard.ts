import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ConsultGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const index = request.rawHeaders.indexOf('Authorization');
    const token = request.rawHeaders[index + 1].replace('Bearer ', '');
    const user = jwt.decode(token) as jwt.JwtPayload;

    // 허용되는 역할 목록
    const allowedRoles = ['consultant', 'admin', 'supervisor'];

    // 사용자의 역할이 허용되는 역할 중 하나인지 확인
    const hasRole = user && allowedRoles.includes(user.role);

    if (!hasRole) {
      // 적절한 에러 메시지와 함께 예외 발생
      throw new HttpException('접근 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    return hasRole;
  }
}
