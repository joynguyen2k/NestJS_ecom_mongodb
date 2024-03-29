import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({unique: true, required: true})
    product_name: string;
    @Prop({required: true})
    image: string;
    @Prop({required: true})
    brand: string;
    // @Prop({required: true})
    // category: string;
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
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);