import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep14Dto {
  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 장점 선택1',
  })
  aPositiveTitle1: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 장점 선택2',
  })
  aPositiveTitle2: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 장점 선택3',
  })
  aPositiveTitle3: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 장점 선택1 설명',
  })
  aPositiveContent1: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 장점 선택2 설명',
  })
  aPositiveContent2: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 장점 선택3 설명',
  })
  aPositiveContent3: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 장점 선택1',
  })
  bPositiveTitle1: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 장점 선택2',
  })
  bPositiveTitle2: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 장점 선택3',
  })
  bPositiveTitle3: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 장점 선택1 설명',
  })
  bPositiveContent1: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 장점 선택2 설명',
  })
  bPositiveContent2: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 장점 선택3 설명',
  })
  bPositiveContent3: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 장점 선택1',
  })
  cPositiveTitle1: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 장점 선택2',
  })
  cPositiveTitle2: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 장점 선택3',
  })
  cPositiveTitle3: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 장점 선택1 설명',
  })
  cPositiveContent1: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 장점 선택2 설명',
  })
  cPositiveContent2: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 장점 선택3 설명',
  })
  cPositiveContent3: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 단점 선택1',
  })
  aNegativeTitle1: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 단점 선택2',
  })
  aNegativeTitle2: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 단점 선택3',
  })
  aNegativeTitle3: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 단점 선택1 설명',
  })
  aNegativeContent1: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 단점 선택2 설명',
  })
  aNegativeContent2: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 단점 선택3 설명',
  })
  aNegativeContent3: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 단점 선택1',
  })
  bNegativeTitle1: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 단점 선택2',
  })
  bNegativeTitle2: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 단점 선택3',
  })
  bNegativeTitle3: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 단점 선택1 설명',
  })
  bNegativeContent1: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 단점 선택2 설명',
  })
  bNegativeContent2: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 단점 선택3 설명',
  })
  bNegativeContent3: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 단점 선택1',
  })
  cNegativeTitle1: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 단점 선택2',
  })
  cNegativeTitle2: string;

  @MaxLength(40)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 단점 선택3',
  })
  cNegativeTitle3: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 단점 선택1 설명',
  })
  cNegativeContent1: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 단점 선택2 설명',
  })
  cNegativeContent2: string;

  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 단점 선택3 설명',
  })
  cNegativeContent3: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '1번 경쟁 제품 이름',
  })
  productA: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '2번 경쟁 제품 이름',
  })
  productB: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '3번 경쟁 제품 이름',
  })
  productC: string;

  @IsString()
  @IsOptional()
  memo:string;
}
