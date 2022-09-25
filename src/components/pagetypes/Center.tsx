import Base, { BasePage } from './Base';
import GearLogo from '../../../public/gear.png';
import Image from 'next/image';

export default function CenterModal({ pageTitle, children, showIcon }: BasePage) {
	return (
		<Base pageTitle={pageTitle}>
			<main className="bg-polygon bg-no-repeat bg-center bg-fixed bg-cover flex flex-col justify-center items-center w-screen h-screen text-center">
				<div className="bg-white dark:bg-zinc-800 w-centermodal h-centermodal rounded-md flex flex-col justify-center items-center  border-black border-2">{children}</div>
			</main>
		</Base>
	);
}
