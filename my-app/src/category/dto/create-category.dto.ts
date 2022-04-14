import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {

    // @IsNotEmpty()
    category_name: string;

    slug: string;

    description: string;

}