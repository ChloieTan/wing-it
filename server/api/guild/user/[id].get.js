import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await prisma.guildMember.findMany({
    where: {
      userId: Number(id),
    },
    include: {
      Guild: {
        select: {
          title: true,
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
      },
    },
  });
});
