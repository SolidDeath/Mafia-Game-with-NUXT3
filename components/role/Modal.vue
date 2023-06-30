<template>
  <div @click="$emit('closeModal')" class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-deep/75">
    <div @click.stop class="text-center bg-background max-h-[500px] max-w-[450px] h-full w-full mt-4 px-16 py-8 rounded-lg">
      <img class="w-1/3 m-auto" :src="iconUrl" :alt="title"/>
      <h3 class="w-full h-max font-bold text-accent text-xl my-4">{{title}}</h3>
      <p class="w-full h-max font-regular text-accent text-md">{{description}}</p>
      <button @click="$emit('closeModal')" class="bg-crimson text-acccent font-bold text-lg text-center rounded-lg px-8 py-2 hover:bg-crimson/90 mt-8">{{ $t('close') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  PROPS
*/
defineProps({
  title: String,
  iconUrl: String,
  description: String,
})
/*
  EMITS
*/
defineEmits(['closeModal'])
</script>