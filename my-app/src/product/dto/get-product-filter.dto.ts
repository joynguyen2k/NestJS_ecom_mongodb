import { IsNumber } from "class-validator";

export class GetProductByFilterDto{
    priceMin?: number;
    priceMax?: number;
    pageSize?: number;
    page?: number | 1;


}