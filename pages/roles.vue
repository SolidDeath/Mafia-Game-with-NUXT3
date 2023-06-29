<template>
  <NuxtLayout name="dashboardlayout">
    <div class="max-w-150 w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto gap-y-8 items-center justify-items-center">
        <RoleCard v-for="card in cards" iconLink="/MWD_logo(t).png" name="This goes here"/>
    </div>
  </NuxtLayout>
</template>

<script setup>
const cards = ["one", "two", "three", "four", "five", "six", "seven"]

</script>
