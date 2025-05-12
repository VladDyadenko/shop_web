import { ICartItem } from "./cart.interface"
import { IUser } from "./user.interface"


interface IRecipient{
    account_id: string
    geteway_id: string
}

interface IAmount{
    value: string
    currency: string
}

interface IPaymentMethod{
    type: string
    id: string
    saved: boolean
}

interface IComfirmation{
    type:string
    return_url: string
    confirmation_url: string
}

export interface IPaymentResponse{
    id: string
    status: string
    amount: IAmount
    recipient: IRecipient
    payment_method: IPaymentMethod
    confirmation: IComfirmation
    created_at: Date
}

export enum EnumOrderStatus { 
    PENDING = 'Pending',
    PAYED = 'Payed'
}

export interface IOrder{
    id: string
    createdAt: string
    items: ICartItem[]
    status: EnumOrderStatus
    user: IUser
    total: number

}