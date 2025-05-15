import { User2 } from 'lucide-react'
import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

import { ILastUsers } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

interface OveriewProps {
	data: ILastUsers[]
}

export function LastUsers({ data }: OveriewProps) {
	return (
		<Card className='col-span-1 lg:col-span-3'>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-4'>
				<CardTitle className='text-xl font-medium tracking-[0.1px] line-clamp-1'>
					Покупці
				</CardTitle>
			</CardHeader>
			<CardContent>
				{data?.length ? (
					data.map(user => (
						<div className='flex items-center mt-5'>
							{/* Коли буде підгружатися реальне фото, прибрати пусту строку */}
							{user.picture === '' ? (
								<Image
									className='rounded-full'
									src={user.picture}
									alt={user.name}
									width={40}
									height={40}
								/>
							) : (
								<div className='flex items-center justify-center rounded-full bg-gray-100 size-10'>
									<User2 className='text-gray-500 size-5' />{' '}
									{/* Дефолтна іконка */}
								</div>
							)}
							<div className='ml-4 space-y-1 text-sm text-muted-foreground'>
								<p className='leading-none'>{user.name}</p>
								<p className='leading-none'>{user.email}</p>
							</div>
							<div className='ml-auto font-medium'>+{formatPrice(user.total)}</div>
						</div>
					))
				) : (
					<div>Цей магазин ще немає покупців</div>
				)}
			</CardContent>
		</Card>
	)
}
