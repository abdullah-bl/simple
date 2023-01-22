import { Outlet } from '@remix-run/react'
import Hero from '~/components/hero'
import Layout from '~/components/layout'
import Tabs from '~/components/tabs'

export default function Index() {
	return (
		<>
			<Hero
				bg='bg-gray-100'
				title='Projects'
				subtitle='View your projects and tasks.'
			/>
			<Tabs
				links={[
					{ href: '/settings', label: 'General' },
					{ href: '/settings/projects', label: 'Projects' },
					{ href: '/settings/budget', label: 'Budget' },
				]}
			/>
			<Outlet />
		</>
	)
}
