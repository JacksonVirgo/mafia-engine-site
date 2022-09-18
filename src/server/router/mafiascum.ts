import { z } from 'zod';
import { createProtectedRouter } from './context';
import axios from 'axios';

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
			const fetchURI = `https://forum.mafiascum.net/viewtopic.php?t=${thread}&ppp=${ppp}`;
			const response = await axios.get(fetchURI);
			return response.data;
		},
	});
