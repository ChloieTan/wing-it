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
  <div class="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
    <div class="w-full max-w-2xl">
      <!-- Header Bar -->
      <div class="bg-blue-500 text-black p-3 flex justify-between items-center rounded-t-lg">
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
