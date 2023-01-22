import { json, LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import Hero from '~/components/hero'
import Layout from '~/components/layout'
import { db } from '~/db.server'

export const loader: LoaderFunction = async ({ request }) => {
	const ms = Date.now()
	const data = db.get()
	const url = new URL(request.url)
	const q = url.searchParams.get('q') || ''
	if (q?.length > 0) {
		const projects = data.projects.filter((project) => {
			return project.name.toLowerCase().includes(q.toLowerCase())
		})
		const budget = data.budget.filter((budget) => {
			return budget.name.toLowerCase().includes(q.toLowerCase())
		})
		return json(
			{ data: { projects, budget }, q, ms: Date.now() - ms },
			{
				headers: {
					'Cache-Control': 'max-age=60',
				},
				status: 200,
			}
		)
	}
	return json(
		{
			data: { projects: data.projects, budget: data.budget },
			q,
			ms: Date.now() - ms,
		},
		{
			headers: {
				'Cache-Control': 'max-age=60',
			},
			status: 200,
		}
	)
}

export default function Search() {
	const data = useLoaderData<typeof loader>()
	return (
		<Layout>
			<div className='flex-1 flex flex-col'>
				<div
					className={`mb-2 w-full flex flex-col items-center justify-center aspect-4 rounded-lg`}
				>
					<h1 className='text-3xl font-bold font-mono'>Search</h1>
					<p className=' font-light font-mono'>Search for projects, items...</p>
					<Form method='get' className='py-2 w-1/2 mt-1'>
						<input
							title='Search'
							placeholder='Search for projects, items...'
							name='q'
							type='search'
							className=' rounded-full w-full py-1 px-4'
						/>
					</Form>
				</div>
				<div className='flex-1 overflow-y-auto'>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			</div>
		</Layout>
	)
}
