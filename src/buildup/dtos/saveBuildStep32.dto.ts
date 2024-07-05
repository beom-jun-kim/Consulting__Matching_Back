import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep32Dto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tang1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tang2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tang3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reliabillty1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reliabillty2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reliabillty3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reliabillty4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reactivity1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reactivity2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reactivity3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reactivity4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reactivity5: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reactivity6: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ability1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ability2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  etiquette1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  etiquette2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  credibility1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stability1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stability2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  understand1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  understand2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  understand3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  communication1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  communication2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  availability1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  availability2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  availability3: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ect1: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ect2: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ect3: string;

  @IsString()
  @IsOptional()
  memo:string;
}
