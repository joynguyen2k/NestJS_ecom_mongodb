import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItems, OrderItemsSchema } from './schemas/order-items.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderItems.name, schema: OrderItemsSchema }]),
    ProductModule
  ],
  providers: [OrderItemsService],
  controllers: [OrderItemsController],
  exports:[OrderItemsService],
})
export class OrderItemsModule {

}
