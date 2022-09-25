import CenterModal from '@/components/pagetypes/Center';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RedirectionTest() {
	const router = useRouter();
	const [ppp, setPPP] = useState(0);
	useEffect(() => {
		if (router.isReady) {
			router.push('/replacement');
		}
	});

	return (
		<CenterModal>
			<h1 className="text-3xl font-semibold">MafiaScum</h1>
			<div className="mx-10">
				<strong>Disclaimer: </strong>Fetching data from MS may put strain on your machine.
			</div>
		</CenterModal>
	);
}
