// receipts.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
class CardDataDto {
  @ApiProperty()
  @IsOptional()
  tid: string;

  @ApiProperty()
  @IsOptional()
  card_approve_no: string;
  @IsOptional()
  @ApiProperty()
  card_no: string;
  @IsOptional()
  @ApiProperty()
  card_interest: string;
  @IsOptional()
  @ApiProperty()
  card_quota: string;
  @IsOptional()
  @ApiProperty()
  card_company_code: string;
  @IsOptional()
  @ApiProperty()
  card_company: string;
  @IsOptional()
  @ApiProperty()
  card_type: string;
}

class MetadataDto {
  @ApiProperty()
  @IsOptional()
  @ApiProperty()
  callbackParam1: string;
  @IsOptional()
  @ApiProperty()
  callbackParam2: string;
  @IsOptional()
  @ApiProperty()
  callbackParam3: string;
  @IsOptional()
  @ApiProperty()
  callbackParam4: string;
}

export class TestDto {
  @IsOptional()
  @ApiProperty()
  receipt_id: string;
  @IsOptional()
  @ApiProperty()
  order_id: string;
  @IsOptional()
  @ApiProperty()
  price: number;
  @IsOptional()
  @ApiProperty()
  tax_free: number;
  @IsOptional()
  @ApiProperty()
  cancelled_price: number;
  @IsOptional()
  @ApiProperty()
  cancelled_tax_free: number;
  @IsOptional()
  @ApiProperty()
  order_name: string;
  @IsOptional()
  @ApiProperty()
  company_name: string;
  @IsOptional()
  @ApiProperty()
  gateway_url: string;
  @IsOptional()
  @ApiProperty()
  metadata: MetadataDto;
  @IsOptional()
  @ApiProperty()
  sandbox: boolean;
  @IsOptional()
  @ApiProperty()
  pg: string;
  @IsOptional()
  @ApiProperty()
  method: string;
  @IsOptional()
  @ApiProperty()
  method_symbol: string;
  @IsOptional()
  @ApiProperty()
  method_origin: string;
  @IsOptional()
  @ApiProperty()
  method_origin_symbol: string;
  @IsOptional()
  @ApiProperty()
  purchased_at: Date;
  @IsOptional()
  @ApiProperty()
  requested_at: Date;
  @IsOptional()
  @ApiProperty()
  status_locale: string;
  @IsOptional()
  @ApiProperty()
  currency: string;
  @IsOptional()
  @ApiProperty()
  receipt_url: string;
  @IsOptional()
  @ApiProperty()
  status: number;
  @IsOptional()
  @ApiProperty()
  card_data: CardDataDto;
  @IsOptional()
  @ApiProperty()
  billing_key: string;
}
