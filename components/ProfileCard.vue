<script setup>
import { ref } from 'vue';
import Card from '~/components/Card.vue';

const user = ref(null);

const actions = [{ name: 'Edit', backgroundColor: 'bg-[#4FE97B]', action: () => console.log('Edit clicked') }];

const userId = sessionStorage.getItem('id');
const {
  data: { value },
} = await useFetch(`/api/user/${userId}`, { method: 'get' });
user.value = value;

const emit = defineEmits(['close']);

const handleLogout = () => {
  sessionStorage.removeItem('id');
  const router = useRouter();
  router.push({ path: '/' });
};
</script>

<template>
  <Card v-if="user" title="My Geek ID" :headerActions="actions" @close="emit('close')">
    <div class="h-full rounded-lg relative border-3 p-5 bg-linear-[180deg,#78B6F5,#ECECEC]">
      <img src="/assets/img/geek_world_logo_white.png"
        class="absolute top-5 right-3 opacity-50 max-w-[100%] w-[350px] h-auto" />
      <div class="flex gap-6 relative">
        <div class="w-[30%]">
          <img src="https://i.pinimg.com/736x/f5/fb/d8/f5fbd8154abc06b8854859587ee8451c.jpg" alt="Profile Avatar"
            class="w-full object-cover max-h-[300px] bg-white rounded-lg flex-shrink-0 border-3" />
          <button
            class="text-xl mt-6 bg-linear-[0deg,#FFB7EE,#D0F9DC] border-3 px-6 py-2 rounded-lg font-mono flex items-center gap-2">
            My Geek Friends
            <span class="text-xl">↗</span>
          </button>
        </div>

        <div class="flex-grow p-3">
          <h2
            class="text-2xl font-mono border-b-2 border-black mb-7 pb-2 max-w-[70%] whitespace-nowrap overflow-ellipsis">
            {{ user.username }}
          </h2>

          <div class="flex items-center gap-4 mb-10">
            <span class="text-xl font-mono pb-2 border-b-2 border-black min-w-[80px]">{{ user.age ?? '-' }}</span>
            <span class="text-xl font-mono pb-2 border-b-2 border-black min-w-[80px]">
              {{ user.gender ?? '-' }}
            </span>
          </div>

          <!-- Tags -->
          <div class="flex gap-2 mb-6 flex-wrap">
            <span v-if="user" v-for="interest in user.UserInterest" :key="interest.Interest.name"
              class="bg-linear-[90deg,#B1B1B1,#FFFFFF] text-black px-4 py-1 rounded-full font-mono border-3">
              {{ interest.Interest.name }}
            </span>
          </div>

          <!-- Group Button -->
          <button
            class="bg-linear-[90deg,#4FE97B,#D0F9DC] text-black px-6 py-2 rounded-full font-mono flex items-center gap-2 border-3">
            {{ user.status ?? '-' }}
          </button>
        </div>
      </div>

      <!-- Bottom Buttons -->
      <div class="absolute bottom-4 right-4 flex gap-2">
        <button class="bg-white p-2 rounded-lg border-3 hover:cursor-pointer">
          <span class="text-red-500 text-xl">🔔</span>
        </button>
        <button class="bg-white px-4 py-2 rounded-lg font-mono border-3 hover:cursor-pointer" @click="handleLogout">LOG
          OUT</button>
      </div>
    </div>
  </Card>
</template>
