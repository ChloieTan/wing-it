import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  return await prisma.user.findFirst({
    where: {
      AND: [{ username: username }, { password: password }],
    }
  });
});
