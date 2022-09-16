import Base, { BasePage } from './Base';
import GearLogo from '../../../public/gear.png';
import Image from 'next/image';

export default function CenterModal({ pageTitle, children, showIcon }: BasePage) {
	return (
		<Base pageTitle={pageTitle}>
			<main className="bg-polygon bg-no-repeat bg-center bg-fixed bg-cover flex flex-col justify-center items-center w-screen h-screen text-center">
				<div className="bg-white w-centermodal h-centermodal rounded-md border-3 border-black flex flex-col justify-center items-center">
					<div>
						<Image src={GearLogo} width={150} height={110} />
					</div>
					{children}
				</div>
			</main>
		</Base>
	);
}
