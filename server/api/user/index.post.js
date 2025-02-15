import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  return await prisma.user.create({
    data: { username, password },
  });
});
