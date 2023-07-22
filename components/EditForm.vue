<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="handleSave">
    <!-- TODO: style -->
    <h2 v-if="showError">{{ showError }}</h2>
    <FormGroup :label="$t('username')" v-model="userForm.displayName" type="text"/>
    <div class="w-full p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 auto-rows-auto gap-y-4 items-center justify-items-center">
      <Role  v-for="icon in icons" v-bind="icon" @click="userForm.iconUrl = icon.iconUrl" :class="userForm.iconUrl == icon.iconUrl ? 'ring-crimson ring-2' : ''" :id="icon.iconUrl"/>
    </div>

  
    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit" @click.prevent="handleSave">{{$t("save")}}</Button>
    </div>
    <h2 v-if="successMessage" class="text-green-500 text-center">{{ successMessage }}</h2>
  </form>
</template>

<script setup lang="ts">
/*
  TYPES
*/

  interface TimestampType {
    nanoseconds: number
    seconds: number
  }

  interface IconObj {
    filepath: string
    iconUrl: string
    createdAt: TimestampType
  }

  interface UserType {
    displayName: string
    iconUrl: string
    uid: string
    accessLevel: number
    email: string
  }


/*
  IMPORTS
*/

  const { subscribeCollection, getDocument, updateDocument } = useFirestore()
/*
  VARIABLES
*/

  const userForm = reactive({
    displayName: "",
    iconUrl: "",
    id: ""
  })


  const icons: Ref<IconObj[] | null> = ref(null);
  const user = ref<UserType | null>(null);
  const isPending = ref(false)
  const showError = ref("")
  const button = ref('Save')	
  const successMessage = ref(null)

  /*
    Server side data fetching
  */

  let serverIcons = await useFetch("../api/firestore/playerIcons")
  icons.value = serverIcons.data.value as IconObj[]
  
  

  onMounted(async() => {
    
    
  /*
    HYDRATION FROM CLIENT SIDE
  */

   

 subscribeCollection("playerIcons").then((iconsData) => {
    
    icons.value = iconsData as IconObj[]
    
 })
   
    watchEffect(() => {
      button.value = isPending.value ? 'Saving...' : 'Save'
    })
    
    const { auth, authReady } = useFirebaseClient()
    
    await authReady
    user.value = await getDocument('users', auth.currentUser.uid) as UserType
    
    userForm.displayName = user.value.displayName
    userForm.iconUrl = user.value.iconUrl
    userForm.id = user.value.uid
    
  })
  
  
  /*
    HELPER FUNCTIONS
  */


  //check if input contains any special symbols
  const checkSpecialChars = (input: string) => {
    const specialChars = /^[a-zA-Z]+$/; 
    return specialChars.test(input)
  } 


  const saveUpdates = async () => {
    console.log(userForm);
    await updateDocument("users", userForm.id, {
      displayName: userForm.displayName,
      iconUrl: userForm.iconUrl
    })
  }


  const savedMessage = () => {
    successMessage.value = "Successfully saved!" // Use Material Icon for "copied"
    setTimeout(() => {
      successMessage.value = "" // Reset to Material Icon for "copy"
    }, 2000)
  }

  const handleSave = () => {
    console.log('saving');
    isPending.value = true
    savedMessage()
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
