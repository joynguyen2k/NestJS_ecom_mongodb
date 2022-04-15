import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class GetProductByFilterDto{
    @IsOptional()
    @IsNotEmpty()
    priceMin: number;
    @IsOptional()
    @IsNotEmpty()
    priceMax: number;
    @IsOptional()
    @IsNotEmpty()
    pageSize: number;
    @IsOptional()
    @IsNotEmpty()
    page: number | 1;
    @IsOptional()
    @IsNotEmpty()
    keyword: string;
    @IsOptional()
    @IsNotEmpty()
    order: string;
    @IsOptional()
    @IsNotEmpty()
    by: string;


}