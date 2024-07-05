import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class SaveBuildUpBmdsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  bmVersion?: string;
}
