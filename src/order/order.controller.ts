import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService
    ){}
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto){
        // console.log('2', createOrderDto)
        return await this.orderService.createOrder(createOrderDto)
    }
}
