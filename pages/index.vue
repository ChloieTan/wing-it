<script setup lang="ts">
const { data } = await useFetch('/api/hello');
</script>

<template>
  <pre>{{ data }}</pre>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
