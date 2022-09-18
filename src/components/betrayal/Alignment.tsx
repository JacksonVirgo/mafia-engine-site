import { Alignment } from '@/utils/data';

type AlignmentProps = {
	alignment?: Alignment;
};
export default function Alignment({ alignment }: AlignmentProps) {
	return (
		<>
			{!alignment && <div>?</div>}
			{alignment === 'evil' && (
				<div className="flex flex-row justify-start">
					<div className="rounded-lg px-2 text-sm bg-red-500 text-white capitalize">{alignment}</div>
				</div>
			)}
			{alignment === 'good' && (
				<div className="flex flex-row justify-start">
					<div className="rounded-lg px-2 text-sm bg-green-600 text-white capitalize">{alignment}</div>
				</div>
			)}
			{alignment === 'neutral' && (
				<div className="flex flex-row justify-start">
					<div className="rounded-lg px-2 text-sm bg-gray-600 text-white capitalize">{alignment}</div>
				</div>
			)}{' '}
		</>
	);
	return <div className="capitalize">{alignment ?? '?'}</div>;
}
