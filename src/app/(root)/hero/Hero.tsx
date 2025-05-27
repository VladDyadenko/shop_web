import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { SITE_DESCRIPTION } from '@/constants/seo.constants'

export function Hero() {
	return (
		<div className='my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl space-y-6'>
			<h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
				Купувати будівельні товари зручно -
				<span className='text-blue-600 block'>все в одному місці</span>
			</h1>
			<p className='text-lg text-muted-foreground'> {SITE_DESCRIPTION}</p>
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant='primary' className='cursor-pointer group'>
					За покупками
					<ArrowRight className='size-4 ml-2 transition-all group-hover:ml-3' />
				</Button>
			</Link>
		</div>
	)
}
