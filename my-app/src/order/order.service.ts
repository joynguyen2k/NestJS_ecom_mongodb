import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import {Model} from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';
import { PaymentMethod } from './enums/payment.enums';
import { User } from 'src/users/schemas/user.schema';
import * as  moment  from 'moment';
@Injectable()
export class OrderService {
    constructor(        
        @InjectModel(Order.name) 
        private orderModel: Model<OrderDocument>,
        private productService: ProductService
    ){}
    async createOrder(createOrderDto: CreateOrderDto, user: User){
        let {orderItems, shippingAddress, paymentMethod, totalItems, isPaid, paidAt}= createOrderDto;
        const currentDate = new Date(moment().format())
        let productItemsPrice=[];
        let result=[];
        for(let i =0; i< orderItems.length; i++){
            const product= await this.productService.getProductById(orderItems[i].product_id);
            result.push({...orderItems[i], product});
            productItemsPrice.push(product.price * orderItems[i].qty)
        }
        
        const order = new this.orderModel({
            orderItems: [...result],
            shippingAddress: shippingAddress,
            paymentMethod,
            totalItems: productItemsPrice.reduce((a,b)=> a+b),
            isPaid,
            paidAt,
            user,
            created_at: currentDate,
            updated_at: currentDate
            
        })
        console.log('order', order)
        return order.save();
    }
    async getAllOrder():Promise<Order[]>{
        return await this.orderModel.find({})
    }
    async summary(){
        const orders = await this.orderModel.aggregate([
            {
                $group:{
                    _id: null,
                    numOrders:{$sum: 1},
                    totalSales: {$sum: '$totalItems'}
                }
            },
            {$sort: {_id:1}}
        ]);
        const dailyOrders = await this.orderModel.aggregate([
            {
                $group:{
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
                    orders:{$sum:1},
                    sales:{$sum :'$totalItems'}
                }
            }
        ])
        
        return {orders, dailyOrders}
    }
    async getOrderMine(user:User){
        const orders = await this.orderModel.find({user: user})
        // const count = await this.orderModel.aggregate([
        //     {
        //         $group:{count:{$sum :1}}

        //     }
        // ])
        return {orders}
    }
    async getOrderById(_id:string): Promise<Order>{
        return await this.orderModel.findById({_id:_id})
    }

    async deleteOrderById(_id:string){
        const order = await this.orderModel.findById(_id);
        if(order){
            console.log('success')
            return await order.remove();
        }else{
            throw new NotFoundException(`Order with ID "${_id}" not found`);

        }
    }
}
