<script setup>
import { ref, onMounted, nextTick } from 'vue';

const user = ref(null);

onMounted(async () => {
  const userId = sessionStorage.getItem('id');
  await nextTick();
  const {
    data: { value },
  } = await useFetch(`/api/user/${userId}`, { method: 'get' });
  user.value = value;
});
</script>

<template>
  <div v-if="user" v-for="interest in user.UserInterest">
    {{ interest.Interest.name }}
  </div>
</template>
