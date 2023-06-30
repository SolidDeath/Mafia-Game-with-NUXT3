<template>
  <NuxtLayout name="dashboardlayout">
    <h1 class="text-center font-Ax font-bold text-accent text-md md:text-lg lg:text-xl text-Ax0 mb-2 pb-8">{{ $t('admin_panel') }}</h1>
    <div class="flex w-full items-center justify-center">
      <div class="w-full items-center justify-items-center gap-4 max-w-[550px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <button v-for="button in buttons" class="w-[100px] h-[45px] hover:cursor-not-allowed rounded-md text-center text-accent bg-background text-sm md:text-md" disabled>{{ button }}</button>
      </div>
    </div>
    <LangSwitcher/>
  </NuxtLayout>
</template>

<script setup>
const buttons = [$t('add_role'), $t('add_adimn'), $t('add_preset'), $t('edit_settings')]
definePageMeta({
  middleware: ['auth','access-level-check'], // Include your middleware here
  meta: {
    requiredAccess: 2 // Specify the required access level here
  }
})
</script>
