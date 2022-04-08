import { IsNumber } from "class-validator";

export class GetProductByFilterDto{
    @IsNumber()
    priceMin?: number;

    @IsNumber()
    priceMax?: number;

}