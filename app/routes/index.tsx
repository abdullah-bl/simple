import type { LoaderFunction } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { Await, Form, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import Hero from '~/components/hero'
import Layout from '~/components/layout'
import { db } from '~/db.server'

export const loader: LoaderFunction = async () => {
	const data = db.get()
	return defer({ data })
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	return (
		<Layout>
			<Hero
				bg='bg-orange-100/50'
				title='Overview'
				subtitle='View your projects and tasks.'
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={data} errorElement={<h2> Error </h2>}>
					{(data) => (
						<div>
							<h2>Projects</h2>
							<pre>
								<code>{JSON.stringify(data, null, 2)}</code>
							</pre>
						</div>
					)}
				</Await>
			</Suspense>
		</Layout>
	)
}
