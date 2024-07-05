/* eslint-disable */
import { IsNotEmpty } from "class-validator";
export class CreateFaqDto{
    @IsNotEmpty()
    category:string;

    @IsNotEmpty()
    question:string;

    @IsNotEmpty()
    answer:string;
}