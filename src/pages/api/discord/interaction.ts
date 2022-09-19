import { NextRequest, NextResponse } from 'next/server';
import { verifyKey } from 'discord-interactions';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const PUBLIC_KEY = '67bc59e4adb1d0ce097926d04244d7eff090b16277572a147f5e9a25d9684890';

// export const config = {
// 	runtime: 'experimental-edge',
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(`--- DATA START ---\n${req.body}\n--- DATA END ---`);
	return res.status(200).json({});
};
