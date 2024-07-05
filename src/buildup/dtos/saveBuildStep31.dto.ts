import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep31Dto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  func1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  func2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  per1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  per2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  design1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  design2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  design3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  quality1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  quality2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service5: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service6: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  service7: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  price1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  price2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  price3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  purchase1: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  purchase2: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  purchase3: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  purchase4: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  purchase5: string;

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
