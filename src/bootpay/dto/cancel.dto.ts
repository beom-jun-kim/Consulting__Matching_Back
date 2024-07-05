import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CancelDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  reserve_id: string;
}
