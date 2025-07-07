import { HeaderMenu } from './header-menu/HeaderMenu'
import { MainMobileSidebar } from './header-menu/MainMobileSidebar'
import { Logo } from './logo/Logo'
import { SearchInput } from './search-input/SearchInput'

export function Header() {
	return (
		<div className='justify-between p-5 gap-x-4 h-full flex items-center bg-white border-b '>
			<Logo />

			<div className='ml-auto hidden w-[40%] lg:block'>
				<SearchInput />
			</div>
			<HeaderMenu />
			<MainMobileSidebar />
		</div>
	)
}
