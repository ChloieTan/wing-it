<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  showEdit: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  }
})

defineEmits(['edit', 'close'])
</script>

<template>
  <div class="absolute top-50 right-50 p-4 ">
    <div class="w-full max-w-2xl">
      <!-- Header Bar -->
      <div class="bg-gray-500 text-black p-3 flex justify-between items-center rounded-t-lg">
        <h1 class="text-2xl font-mono font-bold">My Geek ID</h1>
        <div class="flex gap-2">
          <button class="bg-green-400 px-4 py-1 font-mono">Edit</button>
          <button class="bg-red-400 px-4 py-1 font-mono">X</button>
        </div>
      </div>

      <!-- Card Content Container -->
      <div class="bg-gradient-to-br from-blue-200 to-blue-300 p-6 rounded-b-lg relative">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
