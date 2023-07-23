<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="processForm">
    <FormGroup v-if="formProps.type == 'signup'" :label="$t('username')" v-model="userForm.displayName" type="text" :errorMessage="errorBag.displayName" />

    <FormGroup :label="$t('email')" v-model="userForm.email" type="email" :errorMessage="errorBag.email" />
    <FormGroup :label="$t('password')" v-model="userForm.password" type="password" :errorMessage="errorBag.password" />

    <div v-if="showError" class="text-red-500">{{ errorMessage }}</div>

    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit">
        {{ formProps.type == "signin" ? $t('sign_in') : $t('sign_up') }}
      </Button>
    </div>
  </form>
</template>
  
<script setup lang="ts">

/*
  PROPS
*/
  const formProps = defineProps({
    type: {
      type: String,
      validator: (value) => ["signin", "signup"].includes(value),
    },
  })

/*
  IMPORTS
*/
  const { errorBag, signIn, signUp } = useAuth()
  const { validateEmail, validatePassword, validateUsername } = useValidators()

  const userForm = reactive({
    displayName: null,
    email: null,
    password: null,
  })
  



  const isFormValid = ref(true); 

  const errorMessage = computed(() => {
    const emailValidation = validateEmail(userForm.email);
    const passwordValidation = validatePassword(userForm.password);
    let displayNameValidation = { flag: true, name: null };

    if (formProps.type === "signup") {
      displayNameValidation = validateUsername(userForm.displayName);
    }

    isFormValid.value = emailValidation.flag && passwordValidation.flag && displayNameValidation.flag; // update isFormValid

    if (!emailValidation.flag) {
      console.log(emailValidation.email);
      
      return emailValidation.email;
    }
    if (!passwordValidation.flag) {
      console.log(passwordValidation.password);
      
      return passwordValidation.password;
    }
    if (!displayNameValidation.flag) {
      console.log(displayNameValidation.name);
      
      return displayNameValidation.name;
    }
    

    return null;
  });

const showError = computed(() => !isFormValid.value); // use isFormValid in showError



watchEffect(() => {
  console.log(errorMessage.value); //Has to be logged for the computed property to update
})
  


function processForm() {
  const emailValidation = validateEmail(userForm.email);
  const passwordValidation = validatePassword(userForm.password);
  let displayNameValidation = { flag: true, name: null };

  if (formProps.type === "signup") {
    displayNameValidation = validateUsername(userForm.displayName);
  }

  errorBag.value.email = emailValidation.email;
  errorBag.value.password = passwordValidation.password;
  errorBag.value.displayName = displayNameValidation.name;

  if (emailValidation.flag && passwordValidation.flag && displayNameValidation.flag) {
    if (formProps.type == "signin") signIn(userForm)
    else signUp(userForm)
  }

}

</script>
