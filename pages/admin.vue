<template>
  <NuxtLayout name="dashboardlayout">
    Here will go the admin thingies!
    <LangSwitcher/>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth','access-level-check'], // Include your middleware here
  meta: {
    requiredAccess: 2 // Specify the required access level here
  }
})
</script>
