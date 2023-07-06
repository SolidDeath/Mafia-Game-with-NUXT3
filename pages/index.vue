<template>
  <MetaTags :title="$t('sign_in')" description="This is the sign in page" />
  <NuxtLayout name="guestlayout">
    <UserForm type="signin" />
  </NuxtLayout>
</template>

<script setup>
/*
  IMPORTS
*/
  const localPath = useLocalePath()
  const loginState = useState('loginState', () => false)



  if(process.server){
      const authCookie = useCookie("authCookie")
      loginState.value = authCookie.value ? true : false //if authCookie.value is not null, then
      if(loginState.value == true){
        navigateTo(localPath('/dashboard'))
      }
  }
  else{
    const {user} = useAuth()
    watch(user, (newValue) => {//watching the user object
      loginState.value = newValue ? true : false //if there is a user object, then isLoggedIn is true
      if(loginState.value == true){
        navigateTo(localPath('/dashboard'))
      }
    })
  }

</script>
