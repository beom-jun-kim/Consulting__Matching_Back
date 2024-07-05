import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveBuildStep33Dto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  selectedItem1: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  selectedItem2: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  selectedItem3: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  selectedItem4: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description1: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description2: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description3: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description4: string;

  @IsString()
  @IsOptional()
  memo:string;
}
