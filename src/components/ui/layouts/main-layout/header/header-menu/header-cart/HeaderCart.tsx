import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { DialogTitle } from '@/components/ui/Dialog'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'

import { PUBLIC_URL } from '@/config/url.config'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatPrice } from '../../../../../../../utils/string/format-price'

import { CartItem } from './cart-item/CartItem'
import { useCheckout } from './useCheckout'

export function HeaderCart() {
	const router = useRouter()
	const { createPayment, isLoadingCreate } = useCheckout()
	const { user } = useProfile()
	const { items, total } = useCart()

	const handleClick = () => {
		user ? createPayment() : router.push(PUBLIC_URL.auth())
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' className='relative'>
					<ShoppingCart className='h-5 w-5' />
					{items.length > 0 && (
						<div className='absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'>
							{items.length}
						</div>
					)}
					<span className='ml-2 hidden sm:inline'>Корзина</span>
				</Button>
			</SheetTrigger>
			<SheetContent className='h-full flex flex-col p-5'>
				<SheetHeader>
					<SheetTitle>Корзина</SheetTitle>
				</SheetHeader>
				<div className='flex flex-col w-full flex-1'>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className='text-sm text-muted-foreground'>Корзина порожня!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className='text-lg font-medium'>
							Ітого до оплати: {formatPrice(total)}
						</div>
						<Button
							variant='primary'
							onClick={handleClick}
							disabled={isLoadingCreate}
							className='w-full'
						>
							Перейти до оплати
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
