import { IProduct } from '@/shared/types/product.interface'

import { Hero } from './hero/Hero'

interface HomeProps {
	products: IProduct[]
}
export function Home({ products }: HomeProps) {
	return (
		<>
			<Hero />
		</>
	)
}
