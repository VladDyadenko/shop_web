import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import { LastUsers } from './LastUsers'
import { Overview } from './Overview'

export function MiddleStatistics() {
	const { middle, isPending } = useGetStatistics()

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8 mt-6'>
			{middle?.monthlySales.length || middle?.lastUsers.length ? (
				<>
					<div className='col-span-1 lg:col-span-3 xl:col-span-4'>
						<Overview data={middle?.monthlySales} />
					</div>
					<div className='col-span-1 lg:col-span-3 xl:col-span-4'>
						<LastUsers data={middle?.lastUsers} />
					</div>
				</>
			) : (
				<div>Даних для відображння немає</div>
			)}
		</div>
	)
}
