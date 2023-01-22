import { useNavigate } from '@remix-run/react'
import Hero from '~/components/hero'
import Tabs from '~/components/tabs'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function Project() {
	const navigate = useNavigate()
	return (
		<>
			<div className='flex-1 flex-col'>
				<Hero title='Project' subtitle='Project description' />
				<div className='flex items-center gap-1'>
					<button
						className='py-2 px-4 hover:bg-gray-100 rounded-lg'
						title='Go back'
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon width={18} height={18} />
					</button>
					<Tabs
						links={[
							{ href: '/projects/1', label: 'Tasks' },
							{ href: '/projects/1/settings', label: 'Settings' },
						]}
					/>
				</div>
			</div>
		</>
	)
}
