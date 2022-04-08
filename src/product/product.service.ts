import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductByFilterDto } from './dto/get-product-filter.dto';


@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        return await new this.productModel({
            ...createProductDto
        }).save()
    }
    async getProduct(getProductByFilterDto: GetProductByFilterDto): Promise<Product[]>{
        const {priceMin, priceMax} = getProductByFilterDto;
        const min = priceMin && Number(priceMin) !== 0 ? Number(priceMin) : 0;
        const max = priceMax&& Number(priceMax) !== 0 ? Number(priceMax) : 0;
  
        if(priceMin && priceMax){
            // const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
            const products = this.productModel.find({price: { $gte: min, $lte: max }})
            return products;

        }else{
            const products = this.productModel.find({})
            return products;
        }

    }
    async getProductById(id:string){
        const product = this.productModel.findById({_id:id})
        if(!product) {
            throw new NotFoundException(`ID ${id} not found`);
        }
        return product;
    }
    async deleteProduct(id:string){
        const result = await this.productModel.deleteOne({id});
        return result;
    }
}
