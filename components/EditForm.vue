<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="processForm">
    <FormGroup :label="$t('username')" v-model="userForm.displayName" type="text"/>
    <div class="w-full p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 auto-rows-auto gap-y-4 items-center justify-items-center">
      <Role v-for="icon in icons.value" v-bind="icon" @click="userForm.iconUrl = icon.iconUrl" :class="userForm.iconUrl == icon.iconUrl ? 'ring-crimson ring-2' : ''" :id="icon.iconUrl"/>
    </div>
    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit" @click.prevent="handleSave">{{$t("save")}}</Button>
    </div>
  </form>
</template>

<script setup>

const { subscribeCollection, getDocument, updateDocument } = useFirestore()
/*
  VARIABLES
*/

  const userForm = reactive({
    displayName: "",
    iconUrl: "",
    id: ""
  })
  const icons = ref([])
  const user = ref({})
  const isPending = ref(false)

  const button = ref('Save')	
  onMounted(async() => {
    /*
    HYDRATION FROM CLIENT SIDE
    */
   icons.value  = subscribeCollection("playerIcons")
   
    watchEffect(() => {
      button.value = isPending.value ? 'Saving...' : 'Save'
    })


    const { auth, authReady } = useFirebaseClient()
    await authReady
    console.log(auth.currentUser.uid);
    user.value = await getDocument('users', auth.currentUser.uid)
    userForm.displayName = user.value.displayName
    userForm.iconUrl = user.value.iconUrl
    userForm.id = user.value.uid

  })

  const checkSpecialChars = (input) => {
    const specialChars = /^[a-zA-Z]+$/; //check if input contains any special symbols
    return specialChars.test(input)
  } 


  const saveUpdates = async () => {
    console.log(userForm);
    await updateDocument("users", userForm.id, {
      displayName: userForm.displayName,
      iconUrl: userForm.iconUrl
    })
  }

  const handleSave = () => {
    console.log('saving');
    isPending.value = true
    if(checkSpecialChars(userForm.displayName)){
      console.log('saving');
      saveUpdates()
      // navigateTo(localPath('/dashboard'))
    }
    else{
      showError.value = 'Username can only contain letters (a-Z)'
    }
    isPending.value = false
  }
</script>
