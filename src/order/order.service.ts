import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import {Model} from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';
import { PaymentMethod } from './enums/payment.enums';

@Injectable()
export class OrderService {
    constructor(        
        @InjectModel(Order.name) 
        private orderModel: Model<OrderDocument>,
        private productService: ProductService
    ){}
    async createOrder(createOrderDto: CreateOrderDto): Promise<Order[]|any>{
        let {orderItems, shippingAddress, paymentMethod, totalItems, isPaid, paidAt}= createOrderDto;
        let productItemsPrice=[];
        let result=[];
        for(let i =0; i< orderItems.length; i++){
            const product= await this.productService.getProductById(orderItems[i].product_id);
            result.push({...orderItems[i], product});
            productItemsPrice.push(product.price * orderItems[i].qty)
        }
        console.log('res', result)
        console.log('amount', productItemsPrice)
        // const product = this.productService.getProductById()
        console.log('1',orderItems)
        const order = new this.orderModel({
            orderItems: [...result],
            shippingAddress: shippingAddress,
            paymentMethod,
            totalItems: productItemsPrice.reduce((a,b)=> a+b),
            isPaid,
            paidAt
            
        })
        console.log('order', order)
        return order.save();
    }
}
