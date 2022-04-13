import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
    constructor(
        private orderItemsService: OrderItemsService
    ){}
    @Post()
    async createOrderItems(@Body() createOrderItemsDto: CreateOrderItemsDto){
        return this.orderItemsService.createOrderItems(createOrderItemsDto)
    }

}
