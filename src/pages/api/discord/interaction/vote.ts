import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// export const config = {
// 	runtime: 'experimental-edge',
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { body } = req;
	const { command } = body;
	if (!command) return res.status(400).send('Invalid Body.');
	const { application_id, token } = command;
	const discordURI = `https://discord.com/api/v10/webhooks/${application_id}/${token}/messages/@original`;
	const response = await axios.patch(discordURI, {
		content: 'Vote command handled via seperate endpoint.',
	});
	return res.status(200).json(response);
};
