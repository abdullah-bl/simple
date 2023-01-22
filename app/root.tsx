import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from '@remix-run/react'

import tailwindStylesheetUrl from './styles/app.css'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Remix Notes',
	viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ request }: LoaderArgs) {
	return json({})
}

export default function App() {
	return (
		<html lang='en' className='h-full'>
			<head>
				<Meta />
				<Links />
			</head>
			<body className=' mx-auto max-w-screen-md h-full bg-white text-gray-900 px-1 '>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export function CatchBoundary() {
	const caught = useCatch()
	return (
		<html>
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body className='flex flex-col justify-center items-center h-screen w-screen'>
				<span className='text-7xl font-bold'>🤯</span>
				<h1 className='font-bold font-mono'>
					{caught.status} {caught.statusText}
				</h1>
				<Link to='/'>Go Home</Link>
				<Scripts />
			</body>
		</html>
	)
}
