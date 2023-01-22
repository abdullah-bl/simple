import { ExclamationTriangleIcon, Share2Icon } from '@radix-ui/react-icons'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { db } from '~/db.server'
import * as Sheets from 'xlsx'

export const loader: ActionFunction = async () => {
	const data = db.get()
	return json(data, {
		headers: {
			'Cache-Control': 'no-store',
		},
	})
}

export const action: ActionFunction = async ({ request }) => {
	let formData = await request.formData()
	let action = formData.get('action')
	if (action === 'reset') {
		db.reset()
	}
	return {
		headers: {
			'Cache-Control': 'no-store',
		},
	}
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	const download = () => {
		const wb = Sheets.utils.book_new()
		const budget = Sheets.utils.json_to_sheet(data.budget)
		const projects = Sheets.utils.json_to_sheet(data.projects)
		const phases = Sheets.utils.json_to_sheet(data.phases)
		Sheets.utils.book_append_sheet(wb, budget, 'Budget')
		Sheets.utils.book_append_sheet(wb, projects, 'Projects')
		Sheets.utils.book_append_sheet(wb, phases, 'Phases')
		Sheets.writeFile(wb, 'gen.xlsx')
	}

	const exportAsJSON = () => {
		const json = JSON.stringify(data)
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.download = 'gen.json'
		a.href = url
		a.click()
	}

	return (
		<div className='flex-1'>
			<h1 className='font-bold'>General</h1>
			<Form method='post'>
				<button
					type='submit'
					name='action'
					value='reset'
					title='RESET DATABASE'
				>
					<ExclamationTriangleIcon />
				</button>
			</Form>
			<button
				type='button'
				aria-label='Export'
				title='Export Data as XLSX'
				onClick={download}
			>
				<Share2Icon width={22} height={22} />
			</button>
			<button
				type='button'
				aria-label='Export'
				title='Export Data as JSON'
				onClick={exportAsJSON}
			>
				<Share2Icon width={22} height={22} />
			</button>
			<pre className=' overflow-y-scroll h-auto'>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	)
}
