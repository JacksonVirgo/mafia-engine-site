import CenterModal from '@/components/pagetypes/Center';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RedirectionTest() {
	const router = useRouter();
	const [ppp, setPPP] = useState(0);
	const getPageData = trpc.useMutation('mafiascum.getPageData');
	
	const fetchnewData = async () => {
		const newData = await getPageData.mutateAsync({ thread: '79377', ppp: 25 });
	};

	return (
		<CenterModal>
			<h1 className="text-3xl font-semibold">MafiaScum</h1>
			<div className="mx-10">
				<strong>Disclaimer: </strong>Fetching data from MS may put strain on your machine.
			</div>

			<div onClick={fetchnewData}>Refresh</div>
			<div>{ppp}</div>
		</CenterModal>
	);
}
