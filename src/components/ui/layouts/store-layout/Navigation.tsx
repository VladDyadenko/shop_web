'use client'

import { Album, BarChart, FolderKanban, PaintBucket, Settings, Star } from 'lucide-react'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/config/url.config'

import { MenuItem } from './MenuItem'
import { IMenuItem } from './navigation/menu.interface'

export function Navigation() {
	const params = useParams<{ storeId: string }>()

	const routes: IMenuItem[] = [
		{
			icon: BarChart,
			link: STORE_URL.home(params.storeId),
			value: 'Статистика'
		},
		{
			icon: FolderKanban,
			link: STORE_URL.products(params.storeId),
			value: 'Товари'
		},
		{
			icon: Album,
			link: STORE_URL.categories(params.storeId),
			value: 'Категорії'
		},
		{
			icon: PaintBucket,
			link: STORE_URL.colors(params.storeId),
			value: 'Кольори'
		},
		{
			icon: Star,
			link: STORE_URL.reviews(params.storeId),
			value: 'Відгуки'
		},
		{
			icon: Settings,
			link: STORE_URL.settings(params.storeId),
			value: 'Налаштування магазина'
		}
	]

	return (
		<div className='flex flex-col w-full flex-1 mt-6'>
			<div className='flex flex-col w-full space-y-3'>
				{routes.map(route => (
					<MenuItem key={route.value} route={route} />
				))}
			</div>
		</div>
	)
}
