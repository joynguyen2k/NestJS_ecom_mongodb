import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
    ProductModule,
    AuthModule,
    UsersModule
    
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
