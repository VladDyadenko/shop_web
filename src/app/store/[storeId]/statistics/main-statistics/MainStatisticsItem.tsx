import CountUp from 'react-countup'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

import { IMainStatistics } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

import { getIcon } from './statistics.util'

interface MainStatisticsProps {
	item: IMainStatistics
	isPending: boolean
}

export function MainStatisticsItem({ item, isPending }: MainStatisticsProps) {
	const Icon = getIcon(item.id)

	return (
		<Card className='drop-shadow-sm py-0 gap-0 drop-shadow-none shadow-none'>
			<CardHeader className='p-4 flex-row items-center justify-between space-y-0 pb-2'>
				{isPending ? (
					<Skeleton className='h-4 w-1/2' />
				) : (
					<CardTitle className='text-sm font-medium text-slate-500'>
						{item.name}
					</CardTitle>
				)}
				<Icon className={`size-5 ${item.id === 4 && `text-yellow-400`}`} />
			</CardHeader>
			<CardContent className='px-4 py-2'>
				{isPending ? (
					<Skeleton className='h-7 w-full' />
				) : (
					<h2 className='text-2xl font-bold'>
						{item.id === 1 ? (
							<CountUp end={item.value} formattingFn={formatPrice} />
						) : item.id === 4 ? (
							<CountUp end={item.value} decimals={2} decimal='.' />
						) : (
							<CountUp end={item.value} />
						)}
					</h2>
				)}
			</CardContent>
		</Card>
	)
}
