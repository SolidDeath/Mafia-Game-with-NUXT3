<template>
  <MenuLink :href="localPath('/')" v-if="!isLoggedIn && onRegister">{{ $t('sign_in') }}</MenuLink>
  <MenuLink :to="localPath('/signup')" v-if="!isLoggedIn && !onRegister">{{ $t('sign_up') }}</MenuLink>
  <MenuLink :to="localPath('/roles')" v-if="isLoggedIn">{{ $t('roles') }}</MenuLink>
  <MenuLink :to="localPath('/profile')" v-if="isLoggedIn">{{ $t('profile') }}</MenuLink>
  <MenuButton @click="logOut" v-if="isLoggedIn">{{ $t('sign_out') }}</MenuButton>
</template>

<script setup lang="ts">

/*
  PROPS
*/
  defineProps({
    isLoggedIn: Boolean
  })

/*
  IMPORTS
*/

const { logOut } = useAuth()

/*
  ROUTING
*/
const currentPage = computed(() => {
  return useRoute();
})


const localPath = useLocalePath()
const route = useRoute()  
let onRegister = route.path.includes("signup")

</script>

<style scoped>

</style>