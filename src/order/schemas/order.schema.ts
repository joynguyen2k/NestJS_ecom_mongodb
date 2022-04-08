import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { timestamp } from 'rxjs';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({ required: true})
    OrderItemms:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true,
        },
        qty:{type:Number, required: true}
    }]
    @Prop()
    paymentMethod: string;
    @Prop()
    itemsPrice: number;
    @Prop()
    shippingPrice: number;
    @Prop()
    taxPrice: number;
    @Prop()
    totalPrice: number;
    @Prop({ type: timestamp })
    created_at: Date;
    @Prop({ type: timestamp })
    updated_at: Date;

}

export const OrderSchema = SchemaFactory.createForClass(Order);