<template>
  <MenuLink :href="localPath('/')" v-if="!isLoggedIn && onRegister">{{ $t('sign_in') }}</MenuLink>
  <MenuLink :to="localPath('/signup')" v-if="!isLoggedIn && !onRegister">{{ $t('sign_up') }}</MenuLink>
  <MenuLink :to="localPath('/roles')" v-if="isLoggedIn">{{ $t('roles') }}</MenuLink>
  <MenuLink :to="localPath('/profile')" v-if="isLoggedIn">{{ $t('profile') }}</MenuLink>
  <MenuPanel :to="localPath('/admin')" v-if="isLoggedIn && isAdmin">Admin</MenuPanel>
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
const { getDocument } = useFirestore()


/*
  ROUTING
*/
const currentPage = computed(() => {
  return useRoute();
})


const localPath = useLocalePath()
const route = useRoute()  
let onRegister = route.path.includes("signup")

let isAdmin = ref(false)
/*
  VARIABLES
*/
  const { logOut } = useAuth()

  onMounted(async () => {
    const { auth, authReady } = useFirebaseClient()
    await authReady
    if(auth.currentUser){
      let userId = auth.currentUser.uid
      const userData = await getDocument('users', userId)	
      isAdmin.value = userData.accessLevel > 1
    }
    
  })


  
  
</script>