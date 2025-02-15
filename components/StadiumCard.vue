<script setup>
defineProps({
  leftTitle: {
    type: String,
    required: true
  },
  rightTitle: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="w-full h-full p-15 flex justify-center items-center bg-[rgba(0,0,0,0.5)] fixed z-51 overflow-none">
    <!-- Header Bar -->
    <div class="w-full min-h-[80vh] flex flex-col self-stretch">
      <div class="bg-[#D34848] text-black px-3 flex justify-between items-center border-3">
        <h1 class="text-2xl font-mono font-bold my-3 flex-grow">{{ leftTitle }}</h1>
        <img class="h-16" src="/assets/img/competition_flag.png" />
        <h1 class="text-2xl font-mono font-bold my-3 flex-grow text-right">{{ rightTitle }}</h1>
        <div class="flex gap-2 my- ml-8">
          <button @click="emit('close')" class="hover:cursor-pointer border-3 bg-red-400 px-4 py-1 font-mono">X</button>
        </div>
      </div>

      <!-- Card Content Container -->
      <div class="bg-white p-2 relative h-full overflow-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
