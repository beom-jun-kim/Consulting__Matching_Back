import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  Length,
  IsEmail,
  IsDecimal,
} from 'class-validator';

export class MeraklConsultDto {
  @IsString()
  merchant_uid?: string;

  @IsString()
  consulting_fields?: string;

  @IsString()
  con_name?: string;

  @IsString()
  whereIn?: string;
}
