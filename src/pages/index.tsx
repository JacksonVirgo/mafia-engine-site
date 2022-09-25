import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTheme } from '@/providers/ThemeProvider';

const Home: NextPage = () => {
	const [theme, setTheme] = useTheme();

	return (
		<>
			<Head>
				<title>Mafia Engine</title>
				<meta name="description" content="Online dashboard for all this online Mafia" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<main className={`w-screen h-screen flex flex-row p-1/4 items-center justify-center bg-polygon`}>
				<section className="grow w-3/4 h-3/4 absolute top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-2xl flex flex-col items-center justify-center border-black border-2">
					<div className="absolute top-0 left-0 m-4">
						<Image src={theme === 'dark' ? '/icons/moon.png' : '/icons/sun.png'} width={32} height={32} className={`hover:cursor-pointer ${theme === 'dark' ? 'invert' : ''}`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} alt="toggle darkmode" />
					</div>
					<h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 dark:text-white">
						<span className="text-red-400">Mafia</span> Engine
					</h1>
					<p className="text-2xl text-gray-700 dark:text-white">Which community?</p>
					<div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3">
						<CommunityCard name="Discord Mafia" description="A popular discord server focused primarily in the game of online Mafia." url="/core" />
						<CommunityCard name="MafiaScum" description="The largest website dedicated to the game of Mafia. Played through forums." url="/core" />
						<CommunityCard name="Betrayal" description="A game of trust and betrayal. This unique ORG provides players with complex movesets most other ORGs lack" url="/core" />
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;

type CommunityCardProps = {
	name: string;
	description: string;
	url: string;
};

const CommunityCard = ({ name, description, url }: CommunityCardProps) => {
	return (
		<section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
			<h2 className="text-lg text-gray-700 dark:text-gray-100">{name}</h2>
			<p className="text-sm text-gray-600 dark:text-white">{description}</p>
			<a className="mt-3 text-sm underline text-red-400 decoration-dotted underline-offset-2" href={url}>
				View Tools
			</a>
		</section>
	);
};
