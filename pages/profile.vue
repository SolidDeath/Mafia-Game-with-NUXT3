<template>
  <NuxtLayout name="dashboardlayout">
    <div class="max-w-xl mx-auto px-4 py-16">
      <EditForm/>
    </div>
    <LangSwitcher/>
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
