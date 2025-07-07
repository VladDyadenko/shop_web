import { Plus, Trash, User } from 'lucide-react'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { ReviewModal } from '@/components/ui/modals/ReviewModal'

import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReview'
import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/shared/types/product.interface'

interface ProductReviewsProps {
	product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
	const { user } = useProfile()

	const { deleteReview } = useDeleteReview()

	return (
		<>
			<div className='flex justify-between items-center mt-6'>
				<h1 className='text-2xl font-bold '>Відгуки</h1>
				{user && (
					<ReviewModal storeId={product.storeId}>
						<div className='bg-[#2c7efc] text-white font-bold flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white hover:text-[#2c7efc] rounded transition-colors'>
							<Plus className='size-4' />
							Додати відгук
						</div>
					</ReviewModal>
				)}
			</div>
			<div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4'>
				{product.reviews.length ? (
					product.reviews.map(review => (
						<div key={review.id} className='border rounded-lg p-4'>
							<div className='flex justify-between'>
								<div className='flex items-center gap-x-4 font-medium'>
									{review.user.picture &&
									review.user.picture !== '/uploads/no-user-image.png' ? (
										<Image
											src={review.user.picture}
											alt={review.user.name}
											width={40}
											height={40}
											className='rounded-full object-cover'
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
										<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
											<User className='w-5 h-5 text-gray-500' />
										</div>
									)}
									{review.user.name}
								</div>
								{review.user.id === user?.id && (
									<ConfirmModal handleClick={() => deleteReview(review.id)}>
										<div className='-mt-3 text-red-500 cursor-pointer hover:bg-red-50 p-1 rounded'>
											<Trash className='size-5' />
										</div>
									</ConfirmModal>
								)}
							</div>
							<Rating
								readonly
								initialValue={review.rating}
								SVGstyle={{ display: 'inline-block' }}
								size={18}
								allowFraction
								transition
							/>
							<div className='text-sm text-muted-foreground mt-1'>{review.text}</div>
						</div>
					))
				) : (
					<div className='mt-4'>У цього товару немає відгуків</div>
				)}
			</div>
		</>
	)
}
