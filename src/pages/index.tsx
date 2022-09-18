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
			<h1 className="text-3xl font-semibold">Mafia Engine</h1>
			{session.status === 'authenticated' && (
				<div>
					<Link href="/mafiascum">Mafia Scum</Link>
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
