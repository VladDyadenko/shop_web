import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { useActions } from '@/hooks/useActions'

import { ICartItem } from '@/shared/types/cart.interface'

import { formatPrice } from '@/utils/string/format-price'

import { CartActions } from './CartActions'

interface CartItemProps {
	item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
	const { removeFromCart } = useActions()
	return (
		<div className='flex items-center mb-5'>
			<Link
				href={PUBLIC_URL.product(item.product.id)}
				className='relative h-28 w-28 rounded-md overflow-hidden'
			>
				<Image
					src={item.product.images[0]}
					alt={item.product.title}
					fill
					className='object-cover'
				/>
			</Link>
			<div className='ml-6'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => removeFromCart({ id: item.id })}
					className='h-8 w-full text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0'
					title='Видалити з корзини'
				>
					<X className='size-4' />
					Видалити з корзини
				</Button>
				<h2 className='font-medium line-clamp-1'> {item.product.title}</h2>
				<p className='text-sm text-muted-foreground mt-1'>
					{formatPrice(item.product.price)}
				</p>
				<CartActions item={item} />
			</div>
		</div>
	)
}
