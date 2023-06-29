<template>
    <NuxtLayout name="dashboardlayout">
        Here will go the content of the dashboard! (And it will be cool)
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
