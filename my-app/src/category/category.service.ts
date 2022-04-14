import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import {Model} from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>
    ){}
    async create(createCategoryDto: CreateCategoryDto): Promise<Category>{
        return await new this.categoryModel({...createCategoryDto}).save();
    }
    async update( id: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate(id, {...createCategoryDto}).exec();
      }
    
    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
      }
  
    async findOne(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
      }
  
    async findOneBySlug(slug: string): Promise<Category> {
        return this.categoryModel.findOne({slug}).exec();
      }
  
    // async delete(id: string): Promise<Category> {
    //     return await this.categoryModel.deleteOne({id}).exec();
    // }
}
