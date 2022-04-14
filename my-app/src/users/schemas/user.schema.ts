import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  } from 'mongoose';
import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';
import { Order } from 'src/order/schemas/order.schema';
import { Type } from 'class-transformer';


export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({
        // required: true,
        // unique: true,    
    })
    username:string;
    @Prop() 
    password: string;
    @Prop()
    phone: string;
    @Prop()
    address:string
    @Prop({ type: timestamp })
    created_at: Date;
  
    @Prop({ type: timestamp })
    updated_at: Date;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Order.name })
    @Type(() => Order)
    order: Order[]

}
export const UserSchema = SchemaFactory.createForClass(User);
