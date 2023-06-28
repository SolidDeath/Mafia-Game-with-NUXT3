
<template>
  <header class="w-full h-16 bg-deep px-6 flex items-center justify-between">
    <div class="h-full flex justify-between items-center">
      <img src="/MWD_logo(t).png" alt="Mafia Game logo" class="h-full" />
    </div>
    <div @click="toggleMobileMenu()" class="h-full flex justify-between items-center cursor-pointer md:hidden">
      <img src="/MWD_burger(t).png" alt="Portal navigation burger" class="h-full" />
    </div>
    <div class="space-x-4 items-center hidden md:flex h-full">
      <MenuList :isLoggedIn="loginState"/>
    </div>
  </header>
  <nav :class="[mobileMenu?'transform translate-x-0':'transform translate-x-[150%]','absolute transition transition-transform duration-200 w-screen h-screen bg-shallow md:hidden']">
    <div class="flex items-center justify-start flex-col h-full">
      <MenuList :isLoggedIn="loginState"/>
    </div>
  </nav>
</template>

<script setup>
  const loginState = useState('loginState', () => false)
  const [mobileMenu, toggleMobileMenu] = useToggle();
  
  if(process.server){
    const authCookie = useCookie("authCookie")
    loginState.value = authCookie.value ? true : false //if authCookie.value is not null, then
  }
  else{
    const {user} = useAuth()
    watch(user, (newValue) => {//watching the user object
      loginState.value = newValue ? true : false //if there is a user object, then isLoggedIn is true

    })
  }
</script>
  