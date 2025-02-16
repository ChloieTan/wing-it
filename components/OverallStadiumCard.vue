<script setup>
const organising = ref(false)
</script>

<template>
    <GeneralStadiumCard v-if="!organising" @organise="organising = true" />
    <OrganiserStadiumCard v-else @organise="organising = false" />
</template>