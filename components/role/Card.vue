<template>
  <div class="bg-background box-border cursor-pointer w-36 h-44 sm:w-42 sm:h-45 p-4 hover:transform hover:translate-y-[-4px] hover:border-b-[4px] border-deep transition-200 transition-all rounded-xl">
      <div class="w-full aspect-square p-4">
        <img :src="iconLink" :alt="name"/>
      </div>
      <h2 class="w-full text-center">{{name}}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps({
  iconLink: String,
  name: String
})
</script>

<style scoped>

</style>