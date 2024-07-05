import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep25Dto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  competitor1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  competitor2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  competitor3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  discrim1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  discrim2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  discrim3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  benefit1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  benefit2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  benefit3: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  memo:string;
}
