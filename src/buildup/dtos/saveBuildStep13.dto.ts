import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep13Dto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    description: '고객의 불만사항',
    example: '투자 정보에 대한 신뢰성이 부족해요',
  })
  pain1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  pain2: string;

  @IsOptional()
  @MaxLength(200)
  @IsString()
  @ApiProperty()
  pain3: string;

  @IsOptional()
  @MaxLength(200)
  @IsString()
  @ApiProperty()
  pain4: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  pain5: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  pain6: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  pain7: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  pain8: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    description: '고객의 요구사항',
    example: '쉽고 편하게 암호화폐 투자 시장에 참여하고 싶어요',
  })
  req1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req4: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req5: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req6: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req7: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  req8: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    description: '고객의 불충족욕구',
    example: '더욱 다양한 투자 상품 ',
  })
  um1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um4: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um5: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um6: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um7: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  um8: string;

  @IsString()
  @IsOptional()
  memo:string;
}
