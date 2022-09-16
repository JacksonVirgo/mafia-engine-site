import Head from 'next/head';
export type BasePage = {
	pageTitle?: string;
	showIcon?: boolean;
	children?: React.ReactNode;
};

export default function Base(props: BasePage) {
	return (
		<main>
			<Head>
				{<title>{props.pageTitle ?? 'Mafia Engine'}</title>}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{props.children}
		</main>
	);
}
