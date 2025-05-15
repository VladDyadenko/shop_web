import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/Chart'

import { IMonyhlySales } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

const chartConfig = {
	value: {
		label: 'Прибуток',
		color: '#3B82F6'
	}
} satisfies ChartConfig
interface OveriewProps {
	data: IMonyhlySales[]
}

export function Overview({ data }: OveriewProps) {
	return (
		<Card className='col-span-1 lg:col-span-3 xl:col-span-4'>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-4'>
				<CardTitle className='text-xl font-medium tracking-[0.1px] line-clamp-1'>
					Прибуток
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer className='aspect-auto h-[310px] w-full' config={chartConfig}>
					<AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='data' tickLine={false} axisLine={false} tickMargin={8} />
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={formatPrice}
									indicator='line'
								/>
							}
						/>
						<Area
							dataKey='value'
							type='natural'
							fill='var(--color-value)'
							stroke='var(--color-value)'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
