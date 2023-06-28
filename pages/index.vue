<template>
  <MetaTags title="{{$t('home_title')}}" description="This is the sign in page" />
  <NuxtLayout name="guestlayout">
    <UserForm type="signin" />
  </NuxtLayout>
  <div>
      <LangSwitcher />
  </div>
</template>

<script setup>


</script>
