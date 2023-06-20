<template>
    <NuxtLink :to="href" class="text-gray-50 font-semibold text-xl">
        <slot/>
    </NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        href: String
    })
</script>

<style scoped>

</style>