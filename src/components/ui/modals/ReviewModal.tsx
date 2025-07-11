import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview'

import { IReviewInput } from '@/shared/types/review.interface'

import { Button } from '../Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../Dialog'
import { Textarea } from '../Textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../form-elements/Form'

interface ReviewModalProps {
	storeId: string
}

export function ReviewModal({ children, storeId }: PropsWithChildren<ReviewModalProps>) {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<IReviewInput>({ mode: 'onChange' })

	const { createReview, isLoadingCreate } = useCreateReview(storeId)

	const onSubmit: SubmitHandler<IReviewInput> = data => {
		createReview(data)
		form.reset()
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Створення відгуку</DialogTitle>
					<DialogDescription>
						Для створення відгуку необхідно вказати рейтинг та текст
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='rating'
							rules={{ required: "рейтинг обов'язковий" }}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Rating
											onClick={field.onChange}
											initialValue={field.value}
											SVGstyle={{ display: 'inline-block' }}
											size={20}
											transition
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='text'
							rules={{ required: "текст обов'язковий" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Текст</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Текст відгуку'
											disabled={isLoadingCreate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button variant='primary' disabled={isLoadingCreate}>
								Додати
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
