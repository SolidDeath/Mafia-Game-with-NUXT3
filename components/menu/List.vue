<template>
  <MenuLink href="/" v-if="!isLoggedIn">Sign In</MenuLink>
  <MenuLink to="/signup" v-if="!isLoggedIn">Sign Up</MenuLink>
  <MenuLink to="/dashboard" v-if="isLoggedIn">Dashboard</MenuLink>
  <MenuLink to="/routeTest" v-if="isLoggedIn">Route Test</MenuLink>
  <MenuButton @click="logOut" v-if="isLoggedIn">Sign out</MenuButton>
</template>

<script setup lang="ts">
const { logOut } = useAuth()

defineProps({
  isLoggedIn: Boolean
})
</script>

<style scoped>

</style>