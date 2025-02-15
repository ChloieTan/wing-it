import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      username: true,
      age: true,
      gender: true,
      status: true,
      UserInterest: {
        select: {
          Interest: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
});
