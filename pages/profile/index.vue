<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Card from '~/components/Card.vue';

const user = ref(null);

const actions = [
  { name: 'Edit', backgroundColor: "bg-[#4FE97B]", action: () => console.log('Edit clicked') },
];

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
  <Card v-if="user" title="My Geek ID" :headerActions="actions">
    <div class="h-full bg-gradient-to-br from-blue-200 to-blue-300 p-6 rounded-b-lg relative">
      <div class="flex gap-6">
        <!-- Avatar Section -->
        <div class="w-48 h-48 bg-white rounded-lg p-2 flex-shrink-0">
          <img :src="avatarUrl" alt="Profile Avatar" class="w-full h-full object-contain" />
        </div>

        <!-- Profile Info -->
        <div class="flex-grow">
          <h2 class="text-2xl font-mono border-b-2 border-black mb-4">{{ user.username }}</h2>

          <div class="flex items-center gap-4 mb-4">
            <span class="text-xl font-mono">{{ user.age }}</span>
            <span class="bg-green-400 px-4 py-1 rounded-full font-mono">
              {{ user.gender }}
            </span>
          </div>

          <!-- Tags -->
          <div class="flex gap-2 mb-6">
            <span v-if="user" v-for="interest in user.UserInterest" :key="interest.Interest.name"
              class="bg-gray-400 text-black px-4 py-1 rounded-full font-mono">
              {{ interest.Interest.name }}
            </span>
          </div>

          <!-- Group Button -->
          <button class="bg-green-400 text-black px-6 py-2 rounded-full font-mono flex items-center gap-2">
            Looking to Join a Group
            <span class="transform rotate-90">▼</span>
          </button>
        </div>
      </div>

      <!-- Friends Button -->
      <button
        class="mt-6 bg-gradient-to-r from-pink-200 to-blue-200 px-6 py-2 rounded-full font-mono flex items-center gap-2">
        My Geek Friends
        <span class="transform -rotate-45">↗</span>
      </button>

      <!-- Bottom Buttons -->
      <div class="absolute bottom-4 right-4 flex gap-2">
        <button class="bg-white p-2 rounded-lg">
          <span class="text-red-500 text-xl">🔔</span>
        </button>
        <button class="bg-white px-4 py-2 rounded-lg font-mono">
          LOG OUT
        </button>
      </div>
    </div>
  </Card>
</template>
