import { z } from 'zod';
import { createProtectedRouter } from './context';
import axios from 'axios';
import { load } from 'cheerio';

interface MafiaScumPage {
	title: string;
	currentPage: number;
	lastPage: number;
	url: string;
	posts: Post[];
}
interface Post {
	author: string;
	rawContent: string;
}

export const mafiaScumRouter = createProtectedRouter()
	.query('getPageData', {
		input: z.object({
			thread: z.string(),
			ppp: z.number().optional(),
		}),
		async resolve({ ctx, input: { thread, ppp } }) {
			return {
				thread,
				ppp,
			};
		},
	})
	.mutation('getPageData', {
		input: z.object({
			thread: z.string(),
			ppp: z.number().optional().default(25),
		}),
		async resolve({ ctx, input: { thread, ppp } }) {
			const timeoutID = setTimeout(() => {
				console.log('Timed Out');
				return {
					error: true,
					message: 'Fetching data from an external server took longer than can be handled.',
				};
			}, 9000);

			const fetchURI = `https://forum.mafiascum.net/viewtopic.php?t=${thread}&ppp=${ppp ?? 25}`;
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

					posts.push({ author, rawContent: content as string });
				});

				const page: MafiaScumPage = {
					title,
					currentPage,
					url: fetchURI,
					lastPage: Math.max(lastPageAnchor, currentPage),
					posts: posts,
				};

				clearTimeout(timeoutID);
				return {
					error: false,
					page,
				};
			} catch (err) {
				const error = err as any;
				if (error.status === 404)
					return {
						error: true,
						message: 'Requested page does not exist.',
					};

				return {
					error: true,
					message: 'An unknown error has been reached.',
				};
			}
		},
	});
