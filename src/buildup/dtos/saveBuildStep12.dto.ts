import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class SaveBuildStep12Dto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({
    description:
      '목표 시장에서 일어나고 있는 눈 여겨 볼 만한 변화는 어떠한 것들이 있나요?(신제품 개발의 필요성 확인)',
    example: '제품(서비스)에 대한 수요가 증가',
  })
  selectedItem1: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '목표시장에서 일어나고 있는 일들을 자세하게 설명해 주세요',
    example:
      '코로나 이후 암호화폐 투자 수요는 지속적으로 증가 중 2022년 조사에 따르면 직장인 중 50%이상이 암호화폐 투자 경험이 있음다만 그중 70% 이상이 손실 경험 있다고 밝힘',
  })
  description1: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({
    description:
      '목표 시장에서 일어나고 있는 눈 여겨 볼 만한 변화는 어떠한 것들이 있나요?(신제품 개발의 필요성 확인)',
    example: '제품(서비스)에 대한 수요가 증가',
  })
  selectedItem2: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '목표시장에서 일어나고 있는 일들을 자세하게 설명해 주세요',
    example:
      '코로나 이후 암호화폐 투자 수요는 지속적으로 증가 중 2022년 조사에 따르면 직장인 중 50%이상이 암호화폐 투자 경험이 있음다만 그중 70% 이상이 손실 경험 있다고 밝힘',
  })
  description2: string;

  @IsString()
  @IsOptional()
  memo:string;
}
