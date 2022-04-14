import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    product_name: string;
    image: string;
    brand: string;
    description: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    @IsNotEmpty()
    @IsMongoId()
    category: any;
}