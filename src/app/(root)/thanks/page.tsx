import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Особистий кабінет',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<div className='my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl space-y-6'>
			<h1 className='text-4xl font-bold tracking-tight md:text-5xl'>Дякуємо за покупку!</h1>
			<p className='text-lg text-muted-foreground'>
				Дякуємо за ваше замовлення! Ми цінуємо вашу довіру та постійно покращуємо наш
				сервіс, товари та логистику.
			</p>
			<Link href={PUBLIC_URL.home()}>
				<Button variant='primary' className='cursor-pointer group'>
					На головну
					<ArrowRight className='size-4 ml-2 transition-all group-hover:ml-3' />
				</Button>
			</Link>
		</div>
	)
}
