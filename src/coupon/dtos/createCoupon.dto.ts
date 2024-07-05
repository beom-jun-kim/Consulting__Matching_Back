import { IsOptional, IsString } from 'class-validator';

export class BmdsCouponDTO {
  @IsOptional()
  @IsString()
  authName: string;

  @IsOptional()
  @IsString()
  authEmail: string;

  @IsOptional()
  @IsString()
  authPhone: string;
}
