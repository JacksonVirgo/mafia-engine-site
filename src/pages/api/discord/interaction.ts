import { NextRequest } from 'next/server';
import { verifyKey } from 'discord-interactions';

const PUBLIC_KEY = '843514276383031296';

export const config = {
	runtime: 'experimental-edge',
};

type DiscordInteraction = {
	type: number;
	data?: string;
};
export default (req: NextRequest) => {
	console.log(req);
	const signature = req.headers.get('X-Signature-Ed25519') as unknown as string;
	const timestamp = req.headers.get('X-Signature-Timestamp') as unknown as string;
	const body: string = req.body as unknown as string;
	const isValidRequest = verifyKey(body, signature, timestamp, PUBLIC_KEY);

	if (!isValidRequest) {
		return new Response('Bad request signature', {
			status: 401,
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	const interactionResponse: DiscordInteraction = { type: 1, data: 'PING' };
	return new Response(JSON.stringify(interactionResponse), {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
};
