import { Link, useLocation } from '@remix-run/react'

export default function Navbar() {
	const { pathname } = useLocation()
	return (
		<nav className='flex justify-between items-center sticky top-0 bg-white/70 py-4 sm:px-2'>
			<span className='font-bold font-mono text-xl uppercase from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-gradient-to-r'>
				Simple
			</span>
			<div className='flex items-center gap-2'>
				<Link
					data-active={pathname === '/'}
					className='hover:text-blue-700 '
					to='/'
				>
					Overview
				</Link>
				<Link
					data-active={pathname === '/projects'}
					className='hover:text-blue-700 '
					to='/projects'
				>
					Projects
				</Link>
				<Link
					data-active={pathname === '/budget'}
					className='hover:text-blue-700 '
					to='/budget'
				>
					Budget
				</Link>
				<Link
					data-active={pathname === '/search'}
					className='hover:text-blue-700 '
					to='/search'
				>
					Search
				</Link>
				<Link
					data-active={pathname === '/settings'}
					className='hover:text-blue-700 '
					to='/settings'
				>
					Settings
				</Link>
			</div>
		</nav>
	)
}
