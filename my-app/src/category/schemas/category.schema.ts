import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { timestamp } from 'rxjs';
import { Product } from 'src/product/schemas/product.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
   
    @Prop()
    category_name: string;
    @Prop({ slug: 'name', unique: true, index: true })
    slug: string;

    @Prop()
    description: string;
    
    
  

}

export const CategorySchema = SchemaFactory.createForClass(Category);