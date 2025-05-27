'use client'

import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews'

import { formatDate } from '@/utils/date/formatDate'

import { IReviewColumn, reviewColumns } from './ReviewColumns'

export function Reviews() {
	const { reviews, isLoading } = useGetReviews()

	const formattedReviews: IReviewColumn[] = reviews
		? reviews.map(review => ({
				id: review.id,
				createdAt: formatDate(review.createdAt),
				rating: Array.from({ length: review.rating })
					.map(() => '⭐️')
					.join(' '),
				username: review.user.name
			}))
		: []

	return (
		<div className='p-6'>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className='flex items-center justify-between'>
						<Heading
							title={`Відгуки (${reviews?.length})`}
							description='Усі відгуки цього магазину'
						/>
					</div>
					<div className='mt-3'>
						<DataTable columns={reviewColumns} data={formattedReviews} />
					</div>
				</>
			)}
		</div>
	)
}
