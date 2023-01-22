import { Outlet } from '@remix-run/react'
import Layout from '~/components/layout'

export default function ProjectLayout() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}
