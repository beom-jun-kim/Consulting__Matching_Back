import { IsString } from 'class-validator';

export class PwDto {
  @IsString()
  pw?: string;
}
