'use client'

import { clsx } from 'clsx'
import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Textarea } from '@/components/ui/Textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useUpdateStore } from '@/hooks/queries/stores/UseUpdateStore'
import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'

import { iStoreEdit } from '@/shared/types/store.interface'

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const form = useForm<iStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	})

	const onSubmit: SubmitHandler<iStoreEdit> = data => {
		updateStore(data)
	}

	return (
		<div className='p-6'>
			<div className='flex items-center justify-between'>
				<Heading title='Настройки' description='Керування налаштуваннями магазина' />
				<ConfirmModal handleClick={() => deleteStore()}>
					<Button
						className='flex items-center gap-x-4'
						size='icon'
						variant='primary'
						disabled={isLoadingDelete}
					>
						<Trash className='size-4' />
					</Button>
				</ConfirmModal>
			</div>
			<Form {...form}>
				<form className='space-y-6 h-full' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: "Назва обов'язкова",
								minLength: {
									value: 6,
									message: 'Мінімум 6 символів'
								}
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва</FormLabel>
									<FormControl>
										<Input
											placeholder='Назва магазину'
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Опис</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Опис магазину'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='primary' disabled={isLoadingUpdate}>
						Зберегти
					</Button>
				</form>
			</Form>
		</div>
	)
}
