<template>
  <NuxtLayout name="dashboardlayout">
    Oh wow! You found the profile!
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
