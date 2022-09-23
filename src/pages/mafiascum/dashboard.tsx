import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import BasePage from '@/components/pagetypes/Base';
import { useSession } from 'next-auth/react';

export default function RedirectionTest() {
	const router = useRouter();
	const { data, refetch, isLoading } = trpc.useQuery(['game.getGame']);
	const session = useSession();

	return (
		<BasePage pageTitle="Dashboard | Mafia Engine">
			<div className="w-screen h-screen bg-polygon flex flex-row justify-between">
				<div className="bg-gray-500 bg-opacity-50 flex flex-col p-2">
					<img src={session.data?.user?.image || ''} alt="Image" className="rounded-full h-12 w-12 hover:cursor-pointer" />
				</div>
				<div className="grow bg-opacity-90 bg-gray-500 p-2 flex">
					<div className="bg-white w-1/2 h-32 rounded-lg p-2 flex flex-col text-center align-middle justify-center">
						<h3 className="text-lg font-bold mb-0">Replacement Form</h3>
						<form className="w-2/3 mx-auto">
							<input type="text" placeholder="Page URL" className="border-2 w-full" />
							<input type="submit" value="Format" className="border-2 px-2 mt-1" />
						</form>
					</div>
				</div>
			</div>
		</BasePage>
	);
}
