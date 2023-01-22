import type { LoaderFunction } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import { db } from '~/db.server'

export const loader: LoaderFunction = async () => {
	return defer({
		budget: db.get().budget,
	})
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	return (
		<>
			<h1 className='font-bold'>General</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={data} errorElement={<h2> Error </h2>}>
					{(data) => (
						<div>
							<h2>Budget</h2>
						</div>
					)}
				</Await>
			</Suspense>
		</>
	)
}
