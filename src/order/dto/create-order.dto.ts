import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { Product } from "src/product/schemas/product.schema";
import { PaymentMethod } from "../enums/payment.enums";

export class CreateOrderDto{
    @IsNotEmpty()
    orderItems:[
        {
            product_id: string
            qty: number
        }
    ]
    // @IsNotEmpty()
    shippingAddress:{}
    paymentMethod: PaymentMethod
    totalItems: number
    isPaid: boolean
    paidAt: Date
}