import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CouponService } from 'src/coupon/service/coupon.service';

@Injectable()
export class ActiveVoucherGuard implements CanActivate {
  constructor(private readonly vouchersService: CouponService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // request.user가 존재하는지 확인
    if (!request.user) {
      return false;
    }

    // 사용자가 active 상태의 이용권을 보유하고 있거나 admin/tester 역할인지 확인
    return this.vouchersService.isUserVoucherActive(request.user.id);
  }
}
