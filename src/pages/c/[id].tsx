import CenterModal from '@/components/pagetypes/Center';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RedirectionTest() {
	const [threadId, setThreadId] = useState<string>();
	const [replacement, setReplacement] = useState<string>();
	const [formattedPost, setFormattedPost] = useState<string>();

	const router = useRouter();
	const { id } = router.query;

	return (
		<CenterModal>
			<h1 className="text-3xl font-semibold">MafiaScum</h1>
			<h1 className="text-1xl font-semibold mb-2">{id}</h1>
			<div className="w-2/3 my-2">
				<div className="p-1 w-full border-2 border-black">Example Link</div>
				<input
					onChange={(event) => {
						try {
							const url = new URL(event.target.value);
							const thread = url.searchParams.get('t');
							if (typeof thread === 'string') setThreadId(thread);
							else setThreadId(undefined);
						} catch (err) {
							setThreadId(undefined);
						}
					}}
					placeholder="Game Thread URL"
					className={`p-1 w-full border-2 shadow-none drop-shadow-none ${threadId ? 'border-green-400' : 'border-red-700'}`}
				/>
				<input onChange={(event) => setReplacement(event.target.value)} placeholder="Who replaced out?" className={`mt-2 p-1 w-full border-2 shadow-none drop-shadow-none ${replacement?.trim() != '' ? 'border-green-400' : 'border-red-700'}`} />
			</div>
			<div className="border border-black w-1/4 hover:cursor-pointer hover:bg-gray-100">Create</div>
		</CenterModal>
	);
}
