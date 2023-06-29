<template>
  <MenuLink href="/" v-if="!isLoggedIn&&currentPage.name!='index'">Sign In</MenuLink>
  <MenuLink to="/signup" v-if="!isLoggedIn&&currentPage.name!='signup'">Sign Up</MenuLink>
  <MenuLink to="/dashboard" v-if="isLoggedIn">Dashboard</MenuLink>
  <MenuLink to="/roles" v-if="isLoggedIn">Roles</MenuLink>
  <MenuLink to="/profile" v-if="isLoggedIn">Profile</MenuLink>
  <MenuButton @click="logOut" v-if="isLoggedIn">Sign out</MenuButton>
</template>

<script setup lang="ts">
const { logOut } = useAuth()
const currentPage = computed(() => {
  return useRoute();
})
defineProps({
  isLoggedIn: Boolean
})
</script>

<style scoped>

</style>