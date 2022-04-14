import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/joyshop_ecom'), 
    MulterModule.register({
      dest: './filesload',
    }),
    ProductModule, 
    AuthModule, 
    UsersModule, 
    OrderModule, 
    CategoryModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
