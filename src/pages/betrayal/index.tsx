import CenterModal from '@/components/pagetypes/Center';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RedirectionTest() {
	const router = useRouter();
	const { data, refetch, isLoading } = trpc.useQuery(['game.getGame']);
	const createGame = trpc.useMutation(['game.createGame']);
	const deleteGame = trpc.useMutation(['game.deleteGame']);

	const [requestedTitle, setRequestedTitle] = useState<string>('');

	return (
		<CenterModal>
			<h1 className="text-3xl font-semibold">Betrayal</h1>

			{data ? (
				<>
					<div className="p-2" />

					<div>Loaded Game: {data.title}</div>

					<Button
						label="Load Game"
						onClick={() => {
							router.push('/betrayal/dashboard');
						}}
					/>
					<Button
						label="Delete Game"
						onClick={async () => {
							await deleteGame.mutateAsync({ id: data.id });
							router.reload();
						}}
					/>
				</>
			) : (
				<>
					<div className="p-2" />
					<input
						type="text"
						placeholder="Enter game title..."
						className="border p-2 border-gray-500"
						onChange={(e) => {
							setRequestedTitle(e.target.value);
						}}
					/>
					<Button
						label="Create Game"
						onClick={async () => {
							const result = await createGame.mutateAsync({
								title: requestedTitle,
							});

							if (result) router.reload();
						}}
					/>
				</>
			)}
		</CenterModal>
	);
}

type ButtonProps = {
	label: string;
	onClick?: () => any;
};
function Button({ label, onClick }: ButtonProps) {
	const onClickSubmission = () => {
		if (onClick) onClick();
	};
	return (
		<div className="p-2 w-1/2 border rounded-md border-black m-1 hover:cursor-pointer hover:bg-gray-100 hover:underline" onClick={onClickSubmission}>
			{label}
		</div>
	);
}

function GameExists() {
	return <div>Game Limit has been Reached</div>;
}

function NewGame() {
	return <div>Create a new Game</div>;
}
