'use client'

import { LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { SearchInput } from '../search-input/SearchInput'

import { HeaderCart } from './header-cart/HeaderCart'

export function HeaderMobileMenu({ onNavigate }: { onNavigate?: () => void }) {
	const { user, isLoading } = useProfile()

	return (
		<div className='flex flex-col items-start gap-4 lg:hidden'>
			<div className='w-[90%] lg:hidden'>
				<SearchInput />
			</div>
			<HeaderCart />
			<Link href={PUBLIC_URL.explorer()} onClick={onNavigate}>
				<Button variant='ghost'>Каталог</Button>
			</Link>
			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link href={DASHBOARD_URL.favorites()} onClick={onNavigate}>
						<Button variant='ghost'>Обране</Button>
					</Link>
					{user.stores.length ? (
						<Link href={STORE_URL.home(user.stores[0].id)} onClick={onNavigate}>
							<Button variant='ghost'> Мої магазини</Button>
						</Link>
					) : (
						<CreateStoreModal>
							<span> Створити магазин</span>
						</CreateStoreModal>
					)}
					<Link
						href={DASHBOARD_URL.home()}
						className='flex items-center gap-2'
						onClick={onNavigate}
					>
						{user.picture && user.picture !== '/uploads/no-user-image.png' ? (
							<Image
								src={user.picture}
								alt={user.name}
								width={42}
								height={42}
								className='rounded-full'
								onError={e => {
									e.currentTarget.style.display = 'none'
									if (e.currentTarget.nextSibling) {
										;(
											e.currentTarget.nextSibling as HTMLElement
										).style.display = 'flex'
									}
								}}
							/>
						) : (
							<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ml-2'>
								<User className='w-5 h-5 text-gray-500' />
							</div>
						)}
						{user.name}
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant='primary'>
						<LogOut className='size-4 mr-2' /> Увійти
					</Button>
				</Link>
			)}
		</div>
	)
}
