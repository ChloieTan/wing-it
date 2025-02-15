import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { name, email, username, password } = await readBody(event);

  return await prisma.user.create({
    data: { name, email, username, password },
  });
});
