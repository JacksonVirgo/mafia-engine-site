import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import axios from 'axios';
import { load } from 'cheerio';

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerAuthSession({ req, res });
	if (!session) return res.status(401).json({ error: 'You must be signed in to use this route.' });

	const { thread, ppp } = req.body;
	const fetchURI = `https://forum.mafiascum.net/viewtopic.php?t=${thread}&ppp=${ppp}`;
	const response = await axios.get(fetchURI);

	const html = response.data;
	const $ = load(response.data);

	const title = $('h1');
	console.log(title.first().text());

	return res.status(200).json({ raw: response.data });
};

export default restricted;


