import type { NextPage } from 'next';
import Center from '@/components/pagetypes/Center';
import { trpc } from '../utils/trpc';
import { signIn, useSession, signOut } from 'next-auth/react';
import { DiscordLoginButton } from 'react-social-login-buttons';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home: NextPage = () => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			if (session.status === 'authenticated') {
				const { redir } = router.query;
				if (redir) router.push(decodeURIComponent(redir as string));
			}
		}
	}, [router.isReady, session.status]);

	return (
		<Center pageTitle="Mafia Engine">
			<h1 className="text-5xl leading-normal font-extrabold text-gray-700 dark:text-white mb-2">
				<span className="text-red-400">Mafia</span> Engine
			</h1>
			{session.status === 'authenticated' && (
				<div className="w-full flex flex-col justify-center text-center">
					<Link href="/core">
						<div className="px-4 py-2 border border-black dark:border-white rounded-sm hover:cursor-pointer w-2/3 mx-auto mt-4 hover:underline hover:bg-gray-100 dark: dark:hover:bg-zinc-700 dark:text-white">Example Tool</div>
					</Link>
					<Link href="/core">
						<div className="px-4 py-2 border border-black dark:border-white rounded-sm hover:cursor-pointer w-2/3 mx-auto mt-4 hover:underline hover:bg-gray-100 dark: dark:hover:bg-zinc-700 dark:text-white">Example Tool</div>
					</Link>
					<Link href="/core">
						<div className="px-4 py-2 border border-black dark:border-white rounded-sm hover:cursor-pointer w-2/3 mx-auto mt-4 hover:underline hover:bg-gray-100 dark: dark:hover:bg-zinc-700 dark:text-white">Example Tool</div>
					</Link>
				</div>
			)}
			{session.status === 'unauthenticated' && (
				<div className="flex flex-col w-3/5 mt-4 text-center">
					<DiscordLoginButton onClick={() => signIn('discord')} />
					<div onClick={() => signOut()}>Log Out</div>
				</div>
			)}
		</Center>
	);
};

export default Home;
