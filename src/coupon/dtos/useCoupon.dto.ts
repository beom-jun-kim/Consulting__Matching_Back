import { IsNotEmpty, IsString } from 'class-validator';

export class BmdsCouponCodeDTO {
  @IsString()
  @IsNotEmpty()
  bmdsCoupon: string;
}
