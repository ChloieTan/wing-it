<script setup>
import { ref, onMounted } from 'vue'
import { interests } from "/prisma/seed.js"; 
const selectedInterests = ref([]);

onMounted(() => {
  selectedInterests.value = interests
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
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

    <div class="p-4 bg-gray-200 rounded-lg m-4 border-3 border-black">
        <div class="text-xl flex gap-2 items-center">
            <span>Your Interests:
                <div class="flex gap-2">
                    <span v-for="interest in selectedInterests" :key="interest" 
                    class="px-4 py-1 bg-linear-[#4FE97B,#D0F9DC rounded-full]">
                    {{ interest }}
            </span>
                </div>
            </span>
        </div>
    </div>
    

    </div>
</template>
