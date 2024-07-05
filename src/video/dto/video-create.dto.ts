/*eslint-disable*/
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class VideoCreateDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    description: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    file_path: string;
}