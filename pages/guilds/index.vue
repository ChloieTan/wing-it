<script setup>
import { ref, onMounted, nextTick } from 'vue';

const user = ref(null);
const props = defineProps({
  guildId: {
    type: Number,
  }
})
const guilds = ref(null);

const {
  data: { value },
} = await useFetch('/api/guild/', { method: 'get' });
guilds.value = value;
console.log(guilds)


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
        <div :title="guild.title"  v-for="guild in guilds" class="bg-linear-[45deg,#F8F8F8,#D0F9DC] rounded-4xl p-4 border-2 border-black">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-300"></div>
            <h2 class="text-xl">{{ guild.title }}</h2>
          </div>
          <div class="mt-1">
            <span class="text-sm text-gray-600">{{ guild.tags }}</span>
          </div>
          <p class="mt-2 text-sm">{{ guild.description }}</p>
          <p class="mt-2 text-sm text-gray-500">By: {{ guild.author }}</p>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 z-50 w-full h-[75px] bg-[#D9D9D9] border-t">
    <div class="grid h-full w-fit grid-cols-6 mx-auto font-medium">
      <button type="button" @click="showCard = 'group'"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_group.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Groups</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_stadium.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Stadium</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_chat.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Chats</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group"
        @click="showCard = 'id'">
        <img class="h-[50px]" src="/assets/img/ic_id.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Me</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_friends.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Friends</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_explore.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Explore</span>
      </button>
    </div>
  </div>
    </main>
  </div>
</template>
