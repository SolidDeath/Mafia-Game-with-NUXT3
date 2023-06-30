<template>
  <NuxtLayout name="dashboardlayout">
    <h1 class="text-center font-Ax font-bold text-accent text-md md:text-lg lg:text-xl text-Ax0 mb-2 pb-8">{{ $t('admin_panel') }}</h1>
    <div class="flex w-full items-center justify-center">
      <div class="w-full items-center justify-items-center gap-4 max-w-[550px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <button class="w-[100px] h-[45px] hover:cursor-not-allowed rounded-md text-center text-accent bg-background text-sm md:text-md" disabled>{{$t('add_role') }}</button>
        <button class="w-[100px] h-[45px] hover:cursor-not-allowed rounded-md text-center text-accent bg-background text-sm md:text-md" disabled>{{$t('add_admin')}}</button>
        <button class="w-[100px] h-[45px] hover:cursor-not-allowed rounded-md text-center text-accent bg-background text-sm md:text-md" disabled>{{$t('add_preset')}}</button>
        <button class="w-[100px] h-[45px] hover:cursor-not-allowed rounded-md text-center text-accent bg-background text-sm md:text-md" disabled>{{$t('edit_settings')}}</button>
      </div>
    </div>
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
