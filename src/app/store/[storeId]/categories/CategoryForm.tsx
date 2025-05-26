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

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

interface CategoryFormProps {
	category?: ICategory | null
}

export function CategoryForm({ category }: CategoryFormProps) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const title = category ? 'Змінити дані' : 'Додати нову категорію'
	const description = category ? 'Змінити опис категорії' : 'Додати нову категорію в магазин'
	const action = category ? 'Зберегти' : 'Записати'

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: category || {
			title: '',
			description: ''
		}
	})

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	return (
		<div className='p-6'>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{category && (
					<ConfirmModal handleClick={() => deleteCategory()}>
						<Button
							className='flex items-center gap-x-4'
							size='icon'
							variant='primary'
							disabled={isLoadingDelete}
						>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: "Назва обов'язкова"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва</FormLabel>
									<FormControl>
										<Input
											placeholder='Назва категорії'
											disabled={isLoadingCreate || isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							rules={{
								required: "Опис обов'язковий"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Опис</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Опис категорії'
											disabled={isLoadingCreate || isLoadingUpdate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						className='mt-4'
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}
