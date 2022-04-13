import { isEnum, IsNotEmpty } from "class-validator";
import { PaymentMethod } from "../enums/payment.enums";

export class CreateOrderItemsDto{
    @IsNotEmpty()
    product:[]
    @IsNotEmpty()
    qty:number
    // @isEnum(PaymentMethod,  { each: true })
    paymentMethod: PaymentMethod;
    @IsNotEmpty()
    totalItems: number;
}