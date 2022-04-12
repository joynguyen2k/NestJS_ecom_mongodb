import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import {Model} from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
    constructor(        
        @InjectModel(Order.name) 
        private orderModel: Model<OrderDocument>,
        private productService: ProductService
    ){}
    async createOrder(createOrderDto: CreateOrderDto): Promise<Order[]|any>{
        let {orderItems, shippingAddress, paymentMethod, totalItems, isPaid, paidAt}= createOrderDto;
        let result
        for(let i =0; i< orderItems.length; i++){
            const product= this.productService.getProductById(orderItems[i].product_id);
            orderItems.push(product)
        }
        // const product = this.productService.getProductById()
        console.log('1',orderItems)
        const order = new this.orderModel({
            orderItems: [...orderItems],
            shippingAddress: shippingAddress,
            paymentMethod,
            totalItems,
            isPaid,
            paidAt
            
        })
        return order;
    }
}
