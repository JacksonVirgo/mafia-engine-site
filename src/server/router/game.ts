import { z } from 'zod';
import { createProtectedRouter } from './context';
export const gameRouter = createProtectedRouter()
	.query('getGame', {
		async resolve({ ctx }) {
			const data = await ctx.prisma.game.findFirst({
				where: {
					owner: {
						id: ctx.session.user.id,
					},
				},
				include: {
					owner: true,
				},
			});
			return data;
		},
	})
	.mutation('createGame', {
		input: z.object({
			title: z.string(),
		}),
		async resolve({
			ctx: {
				prisma,
				session: { user },
			},
			input: { title },
		}) {
			if (title === '') return null;
			return await prisma.game.create({
				data: {
					title,
					owner: {
						connect: {
							id: user.id,
						},
					},
				},
			});
		},
	})
	.mutation('deleteGame', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({
			ctx: {
				prisma,
				session: { user },
			},
			input: { id },
		}) {
			const fetchGame = await prisma.game.findFirst({
				include: {
					owner: true,
				},
				where: {
					id,
					owner: {
						id: user.id,
					},
				},
			});

			if (!fetchGame) return null;

			return await prisma.game.delete({
				where: {
					id,
				},
			});
		},
	});
