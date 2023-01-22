import { Link, useLocation } from '@remix-run/react'

export interface ILink {
	href: string
	label: string
}

export default function Tabs({ links }: { links: ILink[] }) {
	const { pathname } = useLocation()
	return (
		<div className='flex items-center gap-1 justify-center py-2'>
			{links.map((link) => (
				<Link
					className='hover:text-blue-700 py-1 px-3 rounded-lg hover:bg-gray-100'
					data-active={pathname === link.href}
					to={link.href}
					key={link.href}
				>
					{link.label}
				</Link>
			))}
		</div>
	)
}
