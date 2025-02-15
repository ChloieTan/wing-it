<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  headerActions: {
    type: Array,
    default: []
  },
  showClose: {
    type: Boolean,
    default: true
  }
})

defineEmits(['edit', 'close'])
</script>

<template>
  <div class="w-full h-full p-15 flex justify-center items-center">
    <!-- Header Bar -->
    <div class="w-full min-h-[80vh] flex flex-col self-stretch">
      <div class="bg-[#0080FF] text-black p-3 flex justify-between items-center border-3">
        <h1 class="text-2xl font-mono font-bold">{{ title }}</h1>
        <div class="flex gap-2">
          <button v-for="action in headerActions" class="px-4 py-1 font-mono border-2" :class="`${action.backgroundColor
            ?? 'bg-green-400'}`">{{ action.name }}</button>
          <button class="border-3 bg-red-400 px-4 py-1 font-mono">X</button>
        </div>
      </div>

      <!-- Card Content Container -->
      <div class="bg-[#D9D9D9] p-2 relative h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
