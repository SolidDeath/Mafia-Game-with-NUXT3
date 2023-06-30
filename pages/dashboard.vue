<template>
    <NuxtLayout name="dashboardlayout">
      <img src="/MWD_logo_extended(t).png" alt="Game of mafia logo" class="w-full max-w-xl m-auto">
      <h1 class="text-center font-Ax font-bold text-accent text-md md:text-lg lg:text-xl text-Ax0 mb-2">Welcome to the game</h1>
      <p class="text-center font-Ax font-light text-accent text-xs md:text-sm text-Ax0 max-w-[500px] mx-auto">Mafia is a game of lying, bluffing and deceit where players try to eliminate other teams from the game. There are several teams that include Mafia and Civilians. The game is divided into two phases: night and day.</p>
      <div class="w-full flex items-center justify-center py-8">
        <NuxtLink :to="localPath('/waitingroom')"><button class="cursor-pointer py-2 px-4 rounded-lg md:rounded-none md:px-8 md:py-4 bg-crimson md:bg-shallow md:border-crimson md:hover:border-b-4 hover:transform hover:translate-y-[-4px] transition-transform transition-50">Join a lobby</button></NuxtLink>
      </div>
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
