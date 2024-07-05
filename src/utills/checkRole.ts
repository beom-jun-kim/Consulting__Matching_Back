import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

function checkUserRoles(user: User, allowedRoles: string[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new HttpException(
      `적절한 권한이 없습니다. 필요한 권한들: ${allowedRoles.join(', ')}`,
      HttpStatus.FORBIDDEN,
    );
  }
}

export default checkUserRoles;
