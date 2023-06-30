<template>
    <div>
        <Menu/>
        <main class="px-4 py-16 text-accent">
            <slot/>
        </main>
        <LocaleModal @closeModal="showLocaleModal=false" v-show="showLocaleModal"/>
        <Locale @openLocale="showLocaleModal=true"/>
    </div>
</template>

<script setup>
let showLocaleModal = ref(false);
</script>