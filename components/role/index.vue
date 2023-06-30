<template>
  <img class="w-[50px] h-[50px] hover:transform hover:translate-y-[-2px] cursor-pointer transition-transform transition-200 hover:ring-crimson hover:ring-2" :src="iconUrl" :alt="title"/>
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