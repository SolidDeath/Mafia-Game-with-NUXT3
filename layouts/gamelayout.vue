<template>
  <div>
    <main class="h-screen w-screen px-4 py-16 text-accent flex items-center justify-center pb-32 flex-col">
      <slot/>
    </main>
    <LocaleModal @closeModal="showLocaleModal=false" v-show="showLocaleModal"/>
    <Locale @openLocale="showLocaleModal=true"/>
  </div>
</template>

<script setup>
let showLocaleModal = ref(false);
</script>