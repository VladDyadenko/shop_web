import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { ICartItem } from '@/shared/types/cart.interface'

interface CartActionsProps {
	item: ICartItem
}

export function CartActions({ item }: CartActionsProps) {
	const { changeQuantity } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity
	return (
		<div className='flex items-center mt-1'>
			<Button
				variant='ghost'
				size='icon'
				onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
				disabled={quantity === 1}
				className='size-7 '
			>
				<Minus className='size-4' />
			</Button>
			<input disabled readOnly value={quantity} className='w-10 text-center text-sm' />
			<Button
				variant='ghost'
				size='icon'
				onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
				className='size-7 '
			>
				<Plus className='size-4' />
			</Button>
		</div>
	)
}
