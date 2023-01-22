import { Outlet, useSearchParams } from '@remix-run/react'
import Hero from '~/components/hero'
import Layout from '~/components/layout'
import Tabs from '~/components/tabs'

export default function Index() {
	const year = new Date().getFullYear()
	const years = Array.from({ length: 5 }, (_, i) => year - i)
	const links = years.map((year) => ({
		href: `/budget?year=${year}`,
		label: String(year),
	}))
	const [search] = useSearchParams()
	const currentYear = search.get('year') || year
	return (
		<Layout>
			<Hero
				bg='bg-gray-100'
				title={`Budget(${currentYear})`}
				subtitle='View your budget.'
			/>
			<Tabs links={links} />
			<Outlet />
		</Layout>
	)
}
