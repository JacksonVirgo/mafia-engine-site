import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import axios from 'axios';
import { load } from 'cheerio';

interface MafiaScumPage {
	title: string;
	currentPage: number;
	lastPage: number;

	posts: Post[];
}

interface Post {
	author: string;
	rawContent?: string;
}

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
	// const session = await getServerAuthSession({ req, res });
	// if (!session) return res.status(401).json({ error: 'You must be signed in to use this route.' });

	const { thread, ppp } = req.query;
	const fetchURI = `https://forum.mafiascum.net/viewtopic.php?t=${thread}&ppp=${25}`;

	try {
		const response = await axios.get(fetchURI);

		const html = response.data;
		const $ = load(html);

		const title = $('h1').first().text();
		const paginationSpan = $('div.pagination > span');
		const lastPageAnchorRaw = paginationSpan.find('a').last().text();
		const lastPageStrongRaw = paginationSpan.find('strong').last().text();

		const lastPageAnchor = parseInt(lastPageAnchorRaw);
		const currentPage = parseInt(lastPageStrongRaw);

		const postElements = $('.post');
		const posts: Post[] = [];

		postElements.each((_index, el) => {
			const element = $(el);

			const author = element.find('.inner > .postprofilecontainer > .postprofile > dt').first().find('a').first().text() ?? '?';
			const body = element.find('.postbody').first();
			const content = body.find('.content').first().html();

			posts.push({ author, rawContent: content ?? undefined });
		});

		const page: MafiaScumPage = {
			title,
			currentPage,
			lastPage: Math.max(lastPageAnchor, currentPage),
			posts: posts,
		};

		return res.status(200).json({ page });
	} catch (err) {
		const error = err as any;
		if (error.status === 404) return res.status(404).json({ message: 'Page does not exist' });
		return res.status(500).json({ err });
	}
};

export default restricted;
