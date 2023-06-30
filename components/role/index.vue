<template>
  <img class="w-[70px] h-[70px] hover:transform hover:translate-y-[-2px] cursor-pointer transition-transform transition-200 p-2 hover:ring-crimson hover:ring-2 rounded-md" :src="iconUrl" :alt="title"/>
</template>

<script setup lang="ts">
/*
  PROPS
*/
defineProps({
  title: String,
  iconUrl: String,
})
</script>

<style scoped>

</style>