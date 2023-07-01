<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="processForm">
    <FormGroup v-if="formProps.type == 'signup'" :label="$t('username')" v-model="userForm.displayName" type="text" :errorMessage="errorBag.displayName" />

    <FormGroup :label="$t('email')" v-model="userForm.email" type="email" :errorMessage="errorBag.email" />
    <FormGroup :label="$t('password')" v-model="userForm.password" type="password" :errorMessage="errorBag.password" />

    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit">
        {{ formProps.type == "signin" ? $t('sign_in') : $t('sign_up') }}
      </Button>
    </div>
  </form>
</template>
  
<script setup>
  const formProps = defineProps({
    type: {
      type: String,
      validator: (value) => ["signin", "signup"].includes(value),
    },
  })
  
  const userForm = reactive({
    displayName: "",
    email: "",
    password: "",
  })
  
  const { errorBag, signIn, signUp } = useAuth()
  
  function processForm() {
    if (formProps.type == "signin") signIn(userForm)
    else signUp(userForm)
  }
</script>
  