import { Button } from '@/components/ui/Button'
import { DialogTitle } from '@/components/ui/Dialog'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

export function HeaderCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Корзина</Button>
			</SheetTrigger>
			<SheetContent>
				<DialogTitle>
					<Heading title='Корзина товарів' className='text-xl' />
				</DialogTitle>
			</SheetContent>
		</Sheet>
	)
}
