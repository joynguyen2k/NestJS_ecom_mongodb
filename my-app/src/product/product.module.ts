import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,

  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService, ProductModule]
})
export class ProductModule {}
