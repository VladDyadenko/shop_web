'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IMenuItem } from './navigation/menu.interface'

interface MenuItemProps {
	route: IMenuItem
}

export function MenuItem({ route }: MenuItemProps) {
	const pathname = usePathname()

	const isActive = pathname === route.link
	return (
		<Link
			href={route.link}
			className={`flex items-center gap-x-3 text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 
  ${
		isActive
			? 'text-sm text-blue-500 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-500'
			: 'text-slate-500 hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm'
  }`}
		>
			<route.icon className='size-5' />
			{route.value}
		</Link>
	)
}
