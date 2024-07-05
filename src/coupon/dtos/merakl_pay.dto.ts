import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  Length,
  IsEmail,
  IsDecimal,
} from 'class-validator';

export class MeraklPayDto {
  @IsString()
  merchant_uid?: string;

  @IsDecimal()
  amount?: string;

  @IsString()
  name?: string;

  @IsString()
  buyer_name?: string;

  @IsString()
  buyer_tel?: string;

  @IsEmail()
  buyer_email?: string;

  @IsString()
  @Length(1, 255)
  query?: string;

  @IsString()
  agreeOrNot?: string;
}
