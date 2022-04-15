import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductByFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('product')
@UseInterceptors(FileInterceptor('file'))
@ApiBearerAuth()
@ApiTags('Product')

export class ProductController {
    constructor(
        private productService: ProductService
    ){}
    @Post()
    // @FormDataRequest()
    async createProduct(@Body() createProductDto: CreateProductDto):Promise<Product> {
        return this.productService.createProduct(createProductDto)

    }
    @Get()
    async getProduct(@Body() getProductByFilterDto: GetProductByFilterDto){
        // console.log('search', getProductByFilterDto)
        return this.productService.getProduct(getProductByFilterDto)
    }
    @Get('/:id')
    async getProductById(@Param('id') id: string){
        return this.productService.getProductById(id)
    }
    @Delete('/:id')
    async deleteProduct(@Param('id') id: string){
        return this.productService.deleteProduct(id)
    }
    @Patch('/:id')
    async updateProduct(@Param('id') id:string, @Body() updateProductDto: UpdateProductDto){
        return this.productService.updateProduct(id, updateProductDto)
    }

}
