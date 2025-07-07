import { ICartItem } from "@/shared/types/cart.interface";

export interface ICartInitialState{
    items:ICartItem[]
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'>{ }

export interface IChangeQuntityPayload extends Pick<ICartItem, 'id'>{ type:'minus' | 'plus' }
