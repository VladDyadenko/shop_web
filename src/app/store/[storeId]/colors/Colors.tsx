'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'

import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { IColor } from '@/shared/types/color.interface'

import { formatDate } from '@/utils/date/formatDate'

import { colorColumns } from './ColorColumns'

export function Colors() {
	const params = useParams<{ storeId: string }>()

	const { colors, isLoading } = useGetColors()
	const formattedColors: IColor[] = colors
		? colors.map(color => ({
				id: color.id,
				createdAt: formatDate(color.createdAt),
				name: color.name,
				value: color.value,
				storeId: color.storeId
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
							title={`Кольори (${colors?.length})`}
							description='Усі кольори цього магазину'
						/>
						<div className='flex items-center gap-x-4'>
							<Link href={STORE_URL.colorCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus className='size-4' />
									Додати колір
								</Button>
							</Link>
						</div>
					</div>
					<div className='mt-3'>
						<DataTable columns={colorColumns} data={formattedColors} filterKey='name' />
					</div>
				</>
			)}
		</div>
	)
}
