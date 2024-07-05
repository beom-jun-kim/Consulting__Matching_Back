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
export class SuperVisorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const index = request.rawHeaders.indexOf('Authorization');
    const token = request.rawHeaders[index + 1].replace('Bearer ', '');
    const user = jwt.decode(token) as jwt.JwtPayload;

    const allowedRoles = ['admin', 'supervisor'];

    const hasRole = user && allowedRoles.includes(user.role);

    if (!hasRole) {
      throw new HttpException('접근 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    return hasRole;
  }
}
