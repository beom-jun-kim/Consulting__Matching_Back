import { Type } from 'class-transformer';
import { FilteredTagDto } from './filteredTag.dto';
import { PaginationDto } from './pagenation.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

export class ConsultantQueryDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilteredTagDto)
  tags?: FilteredTagDto[];

  @IsOptional()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;
}
