'use client'

import Image from 'next/image'
import Link from 'next/link'

import { DASHBOARD_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { Loader } from '../../Loader'

import { StoreSwitcher } from './StoreSwitcher'
import { MobileSidebar } from './navigation/MobileSidebar'

export function Header() {
	const { user, isLoading } = useProfile()
	return (
		<div className='p-6 flex gap-x-4 h-full items-center bg-white border-b '>
			<MobileSidebar />
			<div className='flex gap-x-4 ml-auto items-center'>
				{isLoading ? (
					<Loader size='sm' />
				) : (
					user && (
						<>
							<StoreSwitcher items={user.stores} />
							<Link href={DASHBOARD_URL.home()}>
								<Image
									className='rounded-full'
									src={user.picture}
									alt={user.name}
									width={42}
									height={42}
								/>
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}
