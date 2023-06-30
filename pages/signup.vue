<template>
    <NuxtLayout name="guestlayout">
        <MetaTags :title="$t('sign_up')" :description="$t('sign_up_descrip')" />
        <UserForm type="signup" />
      <LangSwitcher/>
    </NuxtLayout>
</template>


