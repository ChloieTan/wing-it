import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await prisma.competition.findFirst({
    where: { id: Number(id) },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });
});
