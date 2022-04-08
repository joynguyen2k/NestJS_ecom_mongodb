import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({unique: true, required: true})
    product_name: string;
    @Prop({required: true})
    image: string;
    @Prop({required: true})
    brand: string;
    @Prop({required: true})
    category: string;
    @Prop({required: true})
    description: string;
    @Prop({required: true})
    price: number;
    @Prop({required: true})
    countInStock: number;
    @Prop({required: true})
    rating: number;
    @Prop({required: true})
    numReviews: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);