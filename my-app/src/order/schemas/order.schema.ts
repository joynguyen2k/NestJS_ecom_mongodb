import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { timestamp } from 'rxjs';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';
import { PaymentMethod } from '../enums/payment.enums';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
   
    @Prop()
    orderItems:[
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref:'products'}
            qty:{type: Number}
        }
    ]
    @Prop({required: true, type: Object})
    shippingAddress:{
        fullName: string ,
        address: string ,
        city: string ,
        postalCode: string ,
        country: string ,
    }
    @Prop()
    paymentMethod: PaymentMethod;
    @Prop()
    totalItems: number;
    @Prop({default: false})
    isPaid: boolean;
    @Prop({})
    paidAt: Date;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
  
    @Prop({ type: timestamp })
    created_at: Date;
    @Prop({ type: timestamp })
    updated_at: Date;

}

export const OrderSchema = SchemaFactory.createForClass(Order);