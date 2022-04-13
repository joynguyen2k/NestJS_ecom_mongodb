import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderItems, OrderItemsDocument } from './schemas/order-items.schema';
import { Model } from 'mongoose';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { ProductService } from 'src/product/product.service';


@Injectable()
export class OrderItemsService {
    constructor(
        @InjectModel(OrderItems.name) 
        private orderItemsModel: Model<OrderItemsDocument>,
        private productService: ProductService
    ) {}
    async createOrderItems(createOrderItemsDto: CreateOrderItemsDto){
        let {product, qty, paymentMethod, totalItems}= createOrderItemsDto;
        // if (!Array.isArray(product)) {
        //     product = [product];
        //   }
        let products=[];
        
        for(let i=0; i< product.length; i++){
            const p = await this.productService.getProductById(product[i]);
            products.push(p);
        }
        const orderItems = new this.orderItemsModel({
            product: products,
            qty,
            paymentMethod,
            totalItems
        })
        try{
            const order= await orderItems.save();
            return order

        }catch(error){
            console.log(error)
        }

    }
}
