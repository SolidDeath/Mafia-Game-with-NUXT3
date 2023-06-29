
<template>
  <header class="w-full h-20 bg-gray-900 px-6 py-1 flex items-center justify-between">
    <div class="flex justify-between items-center">
      <p class="text-2xl font-semibold text-slate-50">Our App</p>
    </div>


    <div class="flex space-x-4 items-center">
      <MenuLink :href="localPath('/')" v-if="!isLoggedIn && onRegister">{{ $t("sign_in")}}</MenuLink>
      <MenuLink :to="localPath('/signup')" v-if="!isLoggedIn && !onRegister">{{ $t("sign_up")}}</MenuLink>
      <MenuLink :to="localPath('/dashboard')" v-if="isLoggedIn">{{ $t('home_page')}}</MenuLink>
      <MenuLink :to="localPath('/routeTest')" v-if="isLoggedIn">{{ $t('tool_page') }}</MenuLink>
      <button @click="logOut" v-if="isLoggedIn" class="text-gray-50 font-semibold text-xl bg-purple-800 hover:bg-purple-900 p-2  rounded-md ">{{ $t("sign_out")}}</button>
      
    </div>
  </header>
</template>

<script setup>
/*
  Imports
*/

  const { logOut } = useAuth()
/*
  ROUTING
*/
  const localPath = useLocalePath()

  const route = useRoute()  
  let onRegister  = route.path.includes('signup')
  

/*
  STORAGE
*/
  const isLoggedIn = useState('loginState', () => false)
  
/*
  VARIABLES
*/
  let onLoggedIn

  if(process.server){
    const authCookie = useCookie("authCookie")
    isLoggedIn.value = authCookie.value ? true : false //if authCookie.value is not null, then 
  }
  else{
    const {user} = useAuth()
    watch(user, (newValue) => {//watching the user object
      isLoggedIn.value = newValue ? true : false //if there is a user object, then isLoggedIn is true

    })
  }
</script>
  