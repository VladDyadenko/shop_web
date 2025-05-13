import { PropsWithChildren } from 'react'

import { StoreLayout } from '@/components/ui/layouts/store-layout/StoreLayout'

export default function Layout({ children }: PropsWithChildren<{}>) {
	return <StoreLayout>{children}</StoreLayout>
}
