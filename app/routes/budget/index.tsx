import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { db } from '~/db.server'

export const loader: LoaderFunction = async ({ request, params }) => {
	const url = new URL(request.url)
	const year = url.searchParams.get('year') || new Date().getFullYear()

	const budget = db.get().budget

	const current = budget.map((item) => {
		if (item.year === Number(year)) {
			return item
		}
	})
	return json({
		budget: current,
	})
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	return (
		<>
			<h1 className='font-bold'>Budget</h1>
			{JSON.stringify(data, null, 2)}
		</>
	)
}
