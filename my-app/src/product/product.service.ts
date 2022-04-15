import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductByFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        return await new this.productModel({
            ...createProductDto
        }).save()
    }
    async getProduct(getProductByFilterDto: GetProductByFilterDto): Promise<Product[]>{
        const {priceMin, priceMax, pageSize, page, keyword, order, by} = getProductByFilterDto;
        const min = priceMin && Number(priceMin) !== 0 ? Number(priceMin) : 0;
        const max = priceMax&& Number(priceMax) !== 0 ? Number(priceMax) : 0;
        const searchKeyword= `.*${keyword||''}.*`;
        console.log('key', searchKeyword)

        // if((priceMin && priceMax) || pageSize || page || keyword){
            // const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
            const products = await this.productModel.find({
                $and:[
                    {price: { $gte: min, $lte: max }},
                    {product_name: {$regex:searchKeyword, $options:'i'} },
                    {category_name: {$regex:searchKeyword, $options:'i'} }


                ]
            }
         
                                                        )
                                                .populate('category', 'category_name')
                                                .skip(pageSize * (page - 1))
                                                .limit(pageSize)
                                                .sort([
                                                    [by?by:'price', order && order.toLocaleLowerCase()==='desc'?-1:1]
                                                ])
            
            return products

        // }else{
            // const products = this.productModel.find({})
            // return products;
        // }

    }
    async getProductById(id:string): Promise<Product>{
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
    async updateProduct(id:string, updateProductDto: UpdateProductDto){
        const{product_name, image, brand, category, description, price, countInStock, rating, numReviews}= updateProductDto;
        const product = await this.productModel.findById(id);
        if(product){
            product.product_name= product_name;
            product.image= image;
            product.brand= brand;
            product.category= category;
            product.description= description;
            product.price= price;
            product.countInStock= countInStock;
            product.rating= rating;
            product.numReviews= numReviews;
            return await product.save()
            
        }else{
            throw new NotFoundException(`ID ${id} not found`);

        }
    }
}
