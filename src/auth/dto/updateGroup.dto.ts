import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @IsNotEmpty()
  codeName: string;
}
