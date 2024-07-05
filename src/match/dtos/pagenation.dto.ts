import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  currentPage = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize = 10;
}
