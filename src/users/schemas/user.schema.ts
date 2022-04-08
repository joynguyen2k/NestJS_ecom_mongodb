import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  } from 'mongoose';
import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';


export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({
        // required: true,
        // unique: true,    
    })
    username: string;
    @Prop()
    password: string;
    @Prop()
    phone: string;
    @Prop({ type: timestamp })
    created_at: Date;
  
    @Prop({ type: timestamp })
    updated_at: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);
