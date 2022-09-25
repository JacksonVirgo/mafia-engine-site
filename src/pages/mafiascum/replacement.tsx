import CenterModal from '@/components/pagetypes/Center';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RedirectionTest() {
	const [threadId, setThreadId] = useState<string>();
	const [replacement, setReplacement] = useState<string>();
	const [formattedPost, setFormattedPost] = useState<string>();

	const getPageData = trpc.useMutation('mafiascum.getPageData');

	const fetchPageData = async (thread: string, ppp?: number) => {
		const result = await getPageData.mutateAsync({ thread: thread, ppp: ppp ?? 25 });
		const { page } = result;
		if (!result || !page) return;
		const { title, lastPage, posts, url } = page;
		const firstPostAuthor = posts[0]?.author;

		const format = `Month Day - [i][url=${url}]${title}[/url][/i]\n[b]Moderator:[/b] [user]${firstPostAuthor}[/user] [tab]3[/tab][b]Status:[/b] ${lastPage} page/s[tab]3[/tab][b]Replacing:[/b] ${replacement}`;
		setFormattedPost(format);
	};

	if (!formattedPost)
		return (
			<CenterModal>
				<h1 className="text-3xl font-semibold mb-2">MafiaScum</h1>
				<div className="w-2/3 my-2">
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
				<div
					className="border border-black w-1/4 hover:cursor-pointer hover:bg-gray-100"
					onClick={() => {
						if (threadId) fetchPageData(threadId, 1);
					}}
				>
					Create
				</div>
			</CenterModal>
		);
	if (formattedPost)
		return (
			<CenterModal>
				<h1 className="text-3xl font-semibold mb-2">MafiaScum</h1>
				<div className="w-2/3 my-2">
					<div
						onClick={() => {
							navigator.clipboard.writeText(formattedPost);
						}}
					>
						Copy to Clipboard
					</div>
				</div>
				<div className="border border-black w-1/4 hover:cursor-pointer hover:bg-gray-100" onClick={() => setFormattedPost(undefined)}>
					Reset
				</div>
			</CenterModal>
		);
}
