import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { timestamp } from 'rxjs';
import { Product } from 'src/product/schemas/product.schema';
import { PaymentMethod } from '../enums/payment.enums';

export type OrderItemsDocument = OrderItems & Document;

@Schema()
export class OrderItems {
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref:Product.name}])
    @Type(()=> Product)
    product:Product[]
    @Prop({required: true})
    qty:number;
    @Prop()
    paymentMethod: PaymentMethod;
    @Prop()
    totalItems: number;
    @Prop({ type: timestamp })
    created_at: Date;
    @Prop({ type: timestamp })
    updated_at: Date;

}

export const OrderItemsSchema = SchemaFactory.createForClass(OrderItems);