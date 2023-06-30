<template>
  <form v-bind="$attrs" class="w-full flex flex-col space-y-3" @submit.prevent="processForm">
    <FormGroup :label="$t('full_name')" v-model="userForm.name" type="text"/>
    <div class="w-full p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 auto-rows-auto gap-y-4 items-center justify-items-center">
      <Role v-for="role in roles" v-bind="role"/>
    </div>
    <div class="text-center">
      <Button class="bg-blue-500 text-white w-56" type="submit">Save</Button>
    </div>
  </form>
</template>

<script setup>
/*
  INITIAL VALUES FROM SERVER SIDE
*/
const roleref = ref(await useFetch('../api/firestore/roles'))
const roles = ref(roleref.value.data)
const userForm = reactive({
  name: "",
  iconUrl: "",
})
</script>
