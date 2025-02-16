export const verifyUser = async () => {
  const router = useRouter();
  const id = sessionStorage.getItem('id');
  await nextTick();
  if (!id) {
    router.push({ path: '/' });
  }
};
