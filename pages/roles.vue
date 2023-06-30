<template>
  <NuxtLayout name="dashboardlayout">
    <div class="max-w-150 w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto gap-y-8 items-center justify-items-center">
        <RoleCard v-if="roles" @click="handleRoleShow(role)" v-for="role in roles.value" :iconLink="role.iconUrl" :name="role.title" :id="role.title"/>
    </div>
    <RoleModal @closeModal="handleRoleHide" v-show="showRoleInfo" v-bind="roleContent"/>
    <LangSwitcher/>
  </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth','access-level-check'], // Include your middleware here
        meta: {
            requiredAccess: 1 // Specify the required access level here
        }
    })
/*
  INITIAL VALUES FROM SERVER SIDE
*/
  const roleref = ref(await useFetch('../api/firestore/roles'))
  const roles = ref(roleref.value.data)
  let roleContent = ref(null);
  let showRoleInfo = ref(false);

/*
  HYDRATION FROM CLIENT SIDE
*/
  onMounted(async() => {
    const { subscribeCollection } = useFirestore()
    roles.value = subscribeCollection("roles")
  })
/*
  FUNCTIONS
*/
function handleRoleShow(target) {
  showRoleInfo.value = true;
  roleContent.value = target;
}
function handleRoleHide() {
  showRoleInfo.value = false;
}
</script>
