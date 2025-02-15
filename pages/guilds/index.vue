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
  <div class="flex flex-col h-screen bg-gray-200 font-mono">
    <header class="bg-[#0080FF] p-4 flex justify-between items-center border-3 border-black">
      <h1 class="text-4xl">Explore New Guilds</h1>
      <button type="button" class="hover:cursor-pointer">
        <img class="h-[50px]" src="/assets/img/EXIT BUTTOn.png" />
      </button>
    </header>
    <main class="flex-1 p-4 bg-gray-100 overflow-y-auto">
      <!-- Interests Section -->

      <div v-if="user" class="bg-gray-200 border-3 border-black rounded-2xl p-4 mb-4">
        <div class="flex-auto items-center text-2xl ">
          <span>Your interests:</span>
          <div class="flex items-center gap-2">
            <div
              v-for="interest in user.UserInterest"
              :key="interest.Interest.name"
              class="p-4 text-[14px] bg-linear-[45deg,#4FE97B,#D0F9DC] border-2 rounded-full"
            >
              {{ interest.Interest.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- Guilds Grid -->
      <div class="bg-gray-200 border-2 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Create Guild Card -->
        <div class="bg-linear-[45deg,#F8F8F8,#D0F9DC] rounded-4xl p-4 border-2 border-black">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <img class="" src="/assets/img/Group 5.png" />
            </div>
            <h2 class="text-xl">Create a Guild</h2>
          </div>
          <p class="mt-2 text-sm">Create your own guild.</p>
        </div>

        <!-- Guild Cards -->
        <div v-for="guild in guilds" :key="guild.title" class="bg-mint-100 rounded-xl p-4 border-2 border-gray-300">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-300"></div>
            <h2 class="text-xl">{{ guild.title }}</h2>
          </div>
          <div class="mt-1">
            <span class="text-sm text-gray-600">{{ guild.tags.split(', ') }}</span>
          </div>
          <p class="mt-2 text-sm">{{ guild.description }}</p>
          <p class="mt-2 text-sm text-gray-500">By: {{ guild.author }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
