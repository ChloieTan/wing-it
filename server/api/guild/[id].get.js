import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await prisma.guild.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      GuildMembers: {
        select: {
          leader: true,
          User: {
            select: {
              username: true,
            },
          },
        },
      },
      GuildEvent: true,
    },
  });
});
