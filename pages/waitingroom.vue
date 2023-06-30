<template>
  <NuxtLayout name="gamelayout">
    <img src="/MWD_wait(t).svg" alt="WAITING..." class="w-32 animate-spin z-[99]"/>
    <h1 class="text-center font-Ax font-bold text-accent text-md md:text-lg lg:text-xl text-Ax0 mb-2">{{$t('waiting_players')}}</h1>
    <p class="text-center font-Ax font-light text-accent text-xs md:text-sm text-Ax0 max-w-[500px] mx-auto">{{$t('lobby_prompt')}}</p>
    <NuxtLink :to="localPath('/dashboard')" class="m-8 px-4 py-2 rounded-md bg-crimson text-accent text-md font-bold cursor-pointer hover:transform hover:translate-y-[-4px] transition-transform transition-200">{{$t('leave')}}</NuxtLink>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth','access-level-check'], // Include your middleware here
  meta: {
    requiredAccess: 1 // Specify the required access level here
  }
})
const localPath = useLocalePath()
</script>
