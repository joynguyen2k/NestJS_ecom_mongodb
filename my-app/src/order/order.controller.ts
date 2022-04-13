import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService
    ){}
    @UseGuards(AuthGuard())
    @Post()
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() user: User,
        ){
        console.log('2', user)
        return await this.orderService.createOrder(createOrderDto, user)
    }
    @Get()
    async getAllOrder(): Promise<Order[]>{
        return await this.orderService.getAllOrder()
    }
    @Get('/summary')
    async summary(){
        return await this.orderService.summary()
    }
    @UseGuards(AuthGuard())
    @Get('/mine')
    async getOrderMine(@GetUser() user: User){
        console.log(user)
        return await this.orderService.getOrderMine(user)
    }
    @Get('/:id')
    async getOrderById(@Param('id') _id: string ): Promise<Order>{
        return await this.orderService.getOrderById(_id);
    }
    @Delete('/:id')
    async deleteOrderById(@Param('id') _id:string){
            return await this.orderService.deleteOrderById(_id);

    }
  
}
