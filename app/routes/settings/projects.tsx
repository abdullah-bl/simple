import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import * as Sheets from 'xlsx'
import { db } from '~/db.server'

export const loader: LoaderFunction = async () => {
	return defer({
		projects: db.get().projects,
	})
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	const download = () => {
		const wb = Sheets.utils.book_new()
		const ws = Sheets.utils.json_to_sheet(data.projects)
		Sheets.utils.book_append_sheet(wb, ws, 'Projects')
		Sheets.writeFile(wb, 'projects.xlsx')
	}
	return (
		<>
			<h1 className='font-bold'>Projects</h1>
			<button onClick={download}>Download as xlsx</button>
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={data} errorElement={<h2> Error </h2>}>
					{(data) => (
						<div>
							<h2>Projects</h2>
						</div>
					)}
				</Await>
			</Suspense>
		</>
	)
}
