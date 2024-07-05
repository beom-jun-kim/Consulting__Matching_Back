import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SaveBuildStep37Dto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  productKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  priceKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  placeKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  promotionKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  productName: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  productFunc: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  productDesign: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  priceLevel: string;

  @IsOptional()
  @IsString()
  @MaxLength(90)
  priceStrategy: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  priceSolution: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  placeSolution1: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  placeSolution2: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  placeChannel: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  placeChanne2: string;

  @IsOptional()
  @IsBoolean()
  check37_1: boolean;

  @IsOptional()
  @IsBoolean()
  check37_2: boolean;

  @IsOptional()
  @IsBoolean()
  check37_3: boolean;

  @IsOptional()
  @IsBoolean()
  check37_4: boolean;

  @IsOptional()
  @IsBoolean()
  check37_5: boolean;

  @IsOptional()
  @IsBoolean()
  check37_6: boolean;

  @IsOptional()
  @IsBoolean()
  check37_7: boolean;

  @IsOptional()
  @IsBoolean()
  check37_8: boolean;

  @IsOptional()
  @IsBoolean()
  check37_9: boolean;

  @IsString()
  @IsOptional()
  memo:string;
}
