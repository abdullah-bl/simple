import { Outlet } from '@remix-run/react'
import Hero from '~/components/hero'
import Layout from '~/components/layout'
import Tabs from '~/components/tabs'

export default function Index() {
	return (
		<Layout>
			<Hero
				bg='bg-orange-100/50'
				title='Settings'
				subtitle='View your settings.'
			/>
			<Tabs
				links={[
					{ href: '/settings', label: 'General' },
					{ href: '/settings/budget', label: 'Budget' },
					{ href: '/settings/projects', label: 'Projects' },
				]}
			/>
			<Outlet />
		</Layout>
	)
}
