import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import console from 'console';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ){}
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category>{
        // console.log('cat', createCategoryDto)
        return await this.categoryService.create(createCategoryDto)
    }
    @Patch('/:id')
    async update(
        @Param('id') id:string,
        @Body()createCategoryDto: CreateCategoryDto )
    {
        return await this.categoryService.update(id, createCategoryDto)
    }
    @Get('/:id')
    async findOne(@Param('id') id:string){
        return await this.categoryService.findOne(id)
    }
    @Get()
    async findAll():Promise<Category[]>{
        return await this.categoryService.findAll()
    }
}
