import { IMenuItem } from './menu.interface'

interface MenuItemProps {
	item: IMenuItem
}

export function MenuItem({ item }: MenuItemProps) {
	return <div>MenuItem</div>
}
