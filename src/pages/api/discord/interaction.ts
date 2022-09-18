import { NextRequest } from 'next/server';
export const config = {
	runtime: 'experimental-edge',
};

type DiscordInteraction = {
	type: number;
	data?: string;
};
export default (req: NextRequest) => {
	const interactionResponse: DiscordInteraction = { type: 1, data: 'PING' };
	return new Response(JSON.stringify(interactionResponse), {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
};
