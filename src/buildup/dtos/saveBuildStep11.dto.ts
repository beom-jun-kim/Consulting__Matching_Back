import { ApiProperty } from '@nestjs/swagger';
import { text } from 'aws-sdk/clients/customerprofiles';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep11Dto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: '생각하신 아이디어는 어떤 비즈니스 분야에 속하나요?',
    example: '가상 자산 운용 서비스 플랫폼',
  })
  q1: string;

  @IsString()
  @MaxLength(30)
  @ApiProperty({
    description: '관련 시장에 대해 얼마나 이해하고 계시나요?',
    example: '전문가 수준이에요',
  })
  q2: string;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3a: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3b: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3c: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3d: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3e: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3f: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3g: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3h: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3i: number;

  @IsNumber()
  @ApiProperty({
    description:
      '아이디어를 구현하고 실행하는 데 필요로 하는 역량을 어느정도 보유하고 계시나요?(방사형 차트)',
    example: 5,
  })
  q3j: number;

  @IsString()
  @IsOptional()
  memo: string;
}
