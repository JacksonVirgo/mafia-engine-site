import CenterModal from '@/components/pagetypes/Center';
import { trpc } from '@/utils/trpc';
import { create } from 'domain';
import { useState } from 'react';

export default function RedirectionTest() {
	const createGame = trpc.useMutation(['game.createGame']);

	const [count, setCount] = useState<number>(0);

	return <CenterModal></CenterModal>;
}
