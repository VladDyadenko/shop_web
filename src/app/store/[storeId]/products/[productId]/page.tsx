import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ProductEdit } from './ProductEdit'

export const metadata: Metadata = {
	title: 'Картка товару',
	...NO_INDEX_PAGE
}

export default function ProductEditPage() {
	return <ProductEdit />
}
