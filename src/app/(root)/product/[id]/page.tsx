import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { productService } from '@/services/product.service'

import { Product } from './Product'

export const revalidate = 60

export async function generateStaticParams() {
	const products = await productService.getAll()

	const paths = products.map(product => {
		return {
			params: { id: product.id }
		}
	})
	return paths
}

async function getProducts(params: Promise<{ id: string }>) {
	try {
		const { id } = await params
		const product = await productService.getById(id)
		const similarProducts = await productService.getSimilar(id)

		return { product, similarProducts }
	} catch {
		return notFound()
	}
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { product } = await getProducts(params)

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	}
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { product, similarProducts } = await getProducts(params)

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			id={(await params).id}
		/>
	)
}
