import { NextRequest, NextResponse } from 'next/server';
import { verifyKey } from 'discord-interactions';
import { NextApiRequest, NextApiResponse } from 'next';

const PUBLIC_KEY = '843514276383031296';

// export const config = {
// 	runtime: 'experimental-edge',
// };

type DiscordInteraction = {
	type: number;
	data?: string;
};

type Error = {
	error: string;
};
export default (req: NextApiRequest, res: NextApiResponse<DiscordInteraction | Error>) => {
	console.log('Body', req.body, '\n\nHeaders', req.headers);
	const signature = req.headers['X-Signature-Ed25519'] as string;
	const timestamp = req.headers['X-Signature-Timestamp'] as string;
	const body = JSON.stringify(req.body);
	const isValidRequest = verifyKey(body, signature, timestamp, PUBLIC_KEY);

	if (!isValidRequest) return res.status(401).json({ error: 'Unauthorized' });
	const interactionResponse: DiscordInteraction = { type: 1, data: 'PING' };
	return res.status(200).json(interactionResponse);
};
