'use client'

import { clsx } from 'clsx'
import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'

import { STORE_URL } from '@/config/url.config'

import { IStore } from '@/shared/types/store.interface'

import { Button } from '../../Button'
import { CreateStoreModal } from '../../modals/CreateStoreModal'

interface StoreSwitcherProps {
	items: IStore[]
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()
	const param = useParams()

	const isActiveStore =
		items?.length !== 0 && param?.storeId
			? items?.map(item => (item?.id === param?.storeId ? item?.title : ''))
			: ''

	const onStoreSelect = (storeId: string) => {
		setIsOpen(false)
		router.push(STORE_URL.home(storeId))
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					role='combobox'
					aria-expanded={isOpen}
					aria-label='Виберіть магазин'
					className='w-52'
				>
					<StoreIcon className='mr-2 size-4' />
					{items?.length !== 0 && <p>{isActiveStore}</p>}
					<ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-52 p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Знайти потрібний магазин...' />
						<CommandEmpty>Нічого не знайдено</CommandEmpty>
						<CommandGroup heading='Магазини'>
							{items.map(store => (
								<CommandItem
									key={store.id}
									onSelect={() => onStoreSelect(store.id)}
									className='text-sm'
								>
									<StoreIcon className='mr-2 size-4' />
									<div className='line-clamp-1'>{store.title}</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CreateStoreModal>
								<CommandItem>
									<Plus className='mr-2 size-4' />
									Створити магазин
								</CommandItem>
							</CreateStoreModal>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
