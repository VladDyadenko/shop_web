import { ICategory } from "./category.interface"
import { IColor } from "./color.interface"
import { iReview } from "./review.interface"
import { IStore } from "./store.interface"

export interface IProduct{
    id: string
    title: string
    description: string
    price: number   
    image: string[]
    category: ICategory
    reviews: iReview[]
    color: IColor
    store:IStore
}

export interface IProductInput extends Omit<IProduct, 'id' | 'reviews' | 'category' | 'color' | 'store'> { categoryId: string; colorId:string}