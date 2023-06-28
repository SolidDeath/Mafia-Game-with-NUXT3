<template>
  <button class="h-max p-8 md:p-0 md:h-full text-accent font-regular text-xl md:text-lg border-b-2 border-background hover:border-accent">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  href: String
})
</script>

<style scoped>

</style>