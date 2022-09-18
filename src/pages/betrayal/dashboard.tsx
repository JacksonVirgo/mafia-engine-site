import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import BasePage from '@/components/pagetypes/Base';
import { useSession } from 'next-auth/react';
import Table, { Cell, ColumnHeader } from '@/components/Table';
import { faker } from '@faker-js/faker';
import { Alignments } from '@/utils/data';
import { useEffect, useMemo } from 'react';
import Alignment from '@/components/betrayal/Alignment';

const tableHeaders: ColumnHeader[] = [
	{
		layout: 'compress',
		cell: <div className="w-8 text-left border border-separate bg-white">#</div>,
	},
	{
		layout: 'compress',
		cell: <div className="w-64 text-left border border-separate">Player</div>,
	},
	{
		layout: 'compress',
		cell: <div className="w-32 text-left border border-separate bg-white">Alignment</div>,
	},
	{
		layout: 'compress',
		cell: <div className="w-64 text-left border border-separate bg-white">Role</div>,
	},
	{
		cell: <div className=" text-left border border-separate bg-white">Other Information</div>,
	},
];

const generateRandomRowData = (amount: number) => {
	const rows: Cell[][] = [];
	// for (let i = 0; i < amount; i++) {
	// 	let playerIndex = i + 1;
	// 	let player = faker.internet.userName();
	// 	let alignment = Alignments[Math.floor(Math.random() * Alignments.length)];
	// 	rows.push([playerIndex, <input type="text" className="w-full h-full" defaultValue={player} spellCheck={false} />, <Alignment alignment={alignment} />, <input type="text" className="w-full h-full" defaultValue={'?'} spellCheck={false} />, <div className="w-full h-full" contentEditable spellCheck={false} />]);
	// }
	return rows;
};

export default function RedirectionTest() {
	const router = useRouter();
	const { data, refetch, isLoading } = trpc.useQuery(['game.getGame']);
	const session = useSession();
	const tableData = useMemo(() => generateRandomRowData(100), [data]);

	return (
		<BasePage pageTitle="Dashboard | Mafia Engine">
			<div className="w-screen h-screen bg-polygon flex flex-row justify-between">
				<div className="bg-gray-500 bg-opacity-50 flex flex-col p-2">
					<img src={session.data?.user?.image || ''} alt="Image" className="rounded-full h-12 w-12 hover:cursor-pointer" />
				</div>
				<div className="grow bg-opacity-90 bg-gray-500 p-2 flex">
					<div className="m-4 rounded-3xl p-2 overflow-hidden bg-white flex flex-col grow">
						<div className="grow overflow-auto h-full">
							<Table headers={tableHeaders} rows={tableData} />
						</div>
						<div className="shrink border-t-2 flex flex-row">
							<div className="px-4 m-2 border border-black rounded-lg hover:cursor-pointer hover:bg-gray-100">Add New Player</div>
						</div>
					</div>
				</div>
			</div>
		</BasePage>
	);
}
