'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

import { DialogTitle } from '@/components/ui/Dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

import { HeaderMobileMenu } from './HeaderMobileMenu'

export function MainMobileSidebar() {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
				<Menu />
			</SheetTrigger>
			<SheetContent side='left' className='p-5 bg-white'>
				<DialogTitle className='sr-only'>Мобільне меню</DialogTitle>
				<HeaderMobileMenu onNavigate={() => setIsOpen(false)} />
			</SheetContent>
		</Sheet>
	)
}
