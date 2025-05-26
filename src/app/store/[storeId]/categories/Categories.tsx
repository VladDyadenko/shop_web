'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import { ICategory } from '@/shared/types/category.interface'

import { formatDate } from '@/utils/date/formatDate'

import { categoryColumns } from './CategoryColumns'

export function Categories() {
	const params = useParams<{ storeId: string }>()

	const { categories, isLoading } = useGetCategories()
	const formattedColors: ICategory[] = categories
		? categories.map(category => ({
				id: category.id,
				createdAt: formatDate(category.createdAt),
				title: category.title,
				description: category.description,
				storeId: category.storeId
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
							title={`Категорії (${categories?.length})`}
							description='Усі категорії цього магазину'
						/>
						<div className='flex items-center gap-x-4'>
							<Link href={STORE_URL.categoryCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus className='size-4' />
									Додати категорію
								</Button>
							</Link>
						</div>
					</div>
					<div className='mt-3'>
						<DataTable
							columns={categoryColumns}
							data={formattedColors}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}
