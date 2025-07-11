import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ColorEdit } from './ColorEdit'

export const metadata: Metadata = {
	title: 'Настройка кольорів',
	...NO_INDEX_PAGE
}

export default function colorEditPage() {
	return <ColorEdit />
}
