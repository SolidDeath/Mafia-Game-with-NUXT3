<template>
  <NuxtLayout name="dashboardlayout">
    Welcome to the waiting room!
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth','access-level-check'], // Include your middleware here
  meta: {
    requiredAccess: 1 // Specify the required access level here
  }
})
</script>
