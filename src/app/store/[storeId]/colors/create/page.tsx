import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateColor } from './CreateColor'

export const metadata: Metadata = {
	title: 'Додавання кольору',
	...NO_INDEX_PAGE
}

export default function CreateProductPage() {
	return <CreateColor />
}
