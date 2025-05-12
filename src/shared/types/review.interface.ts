import { IUser } from "./user.interface"

export interface iReview{
    id: string
    createdAt: string
    text: string
    rating: number
    user:IUser
}

export interface IReviewInput extends Pick<iReview, 'text' | 'rating'> { }