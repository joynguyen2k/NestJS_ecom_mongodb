import { IsNotEmpty } from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    product_name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}