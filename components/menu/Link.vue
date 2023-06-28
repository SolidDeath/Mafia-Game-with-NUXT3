<template>
    <NuxtLink :to="href" class="flex h-max p-8 md:p-0 md:h-full justify-center items-center text-accent font-regular text-xl md:text-lg border-b-2 border-background hover:border-accent">
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