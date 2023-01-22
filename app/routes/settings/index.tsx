import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { db } from '~/db.server'

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
			<pre className=' overflow-y-scroll h-auto'>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	)
}
