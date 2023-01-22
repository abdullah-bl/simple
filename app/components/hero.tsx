export default function Hero({
	title,
	subtitle,
	bg,
}: {
	bg?:
		| 'bg-gray-100'
		| 'bg-blue-100'
		| 'bg-orange-100'
		| 'bg-orange-100/50'
		| string
	title?: string
	subtitle?: string
}) {
	return (
		<div
			className={`mb-2 flex flex-col items-center justify-center aspect-4 rounded-lg ${bg}`}
		>
			<h1 className='text-3xl font-bold font-mono'>{title}</h1>
			<p className=' font-light font-mono'>{subtitle}</p>
		</div>
	)
}
