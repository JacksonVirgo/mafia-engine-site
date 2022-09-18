import { NextRequest, NextResponse } from 'next/server';
import { verifyKey } from 'discord-interactions';
import { NextApiRequest, NextApiResponse } from 'next';

const PUBLIC_KEY = '67bc59e4adb1d0ce097926d04244d7eff090b16277572a147f5e9a25d9684890';

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
	const signature = req.headers['X-Signature-Ed25519'.toLowerCase()] as string;
	const timestamp = req.headers['X-Signature-Timestamp'.toLowerCase()] as string;
	const body = JSON.stringify(req.body);

	console.log(req.body);
	console.log(`${signature}\n${timestamp}\n${PUBLIC_KEY}`);

	const isValidRequest = verifyKey(body, signature, timestamp, PUBLIC_KEY);

	if (!isValidRequest) return res.status(401).json({ error: 'Unauthorized' });
	const interactionResponse: DiscordInteraction = { type: 1, data: 'PING' };
	return res.status(200).json(interactionResponse);
};
