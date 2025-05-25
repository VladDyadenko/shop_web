import { ICategory } from "./category.interface"
import { IColor } from "./color.interface"
import { IReview } from "./review.interface"

export interface IProduct{
    id: string
    title: string
    description: string
    images: string[]
    price: number   
    category: ICategory
    reviews: IReview[]
    color: IColor
    storeId:string
}

export interface IProductInput extends Omit<IProduct, 'id' | 'reviews' | 'category' | 'color' | 'storeId'> { categoryId: string; colorId:string}