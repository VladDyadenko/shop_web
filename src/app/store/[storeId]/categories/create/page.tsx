import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateCategory } from './CreateCategory'

export const metadata: Metadata = {
	title: 'Додавання категорії',
	...NO_INDEX_PAGE
}

export default function CreateCategoryPage() {
	return <CreateCategory />
}
