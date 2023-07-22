<template>
  <NuxtLayout name="dashboardlayout">
    <div class="max-w-150 w-full p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto gap-y-8 items-center justify-items-center">
        <RoleCard v-if="roles" @click="handleRoleShow(role)" v-for="role in roles" :iconLink="role.iconUrl" :name="role.title" :id="role.title"/>
    </div>
    <RoleModal @closeModal="handleRoleHide" v-show="showRoleInfo" v-bind="roleContent"/>
  </NuxtLayout>
</template>

<script setup lang="ts">

/*
  PAGE META
*/
  definePageMeta({
      middleware: ['auth','access-level-check'], // Include your middleware here
      meta: {
          requiredAccess: 1 // Specify the required access level here
      }
  })

/*
  TYPES
*/

  interface roleType {
    canBeKilledByMafia: boolean;
    abilityCount: number;
    winCondition: string;
    description: string;
    abilityPerNight: number;
    category: string;
    alignment: string;
    aura: string;
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
    filepath: string;
    iconUrl: string;
    canBeMultiple: boolean;
    response: string;
    hasDayAction: boolean;
    hasNightAction: boolean;
    title: string;
    id: string;
  }
/*
  INITIAL VALUES FROM SERVER SIDE
*/
  const roleref = ref(await useFetch('../api/firestore/roles'))
  

/*
  ROLE VALUES
*/
  const roles = ref(null)
  roles.value = roleref.value.data as roleType[]
  let roleContent = ref(null);
  let showRoleInfo = ref(false);

/*
  HYDRATION FROM CLIENT SIDE
*/
  onMounted(async() => {
    const { subscribeCollection } = useFirestore()
    roles.value = await subscribeCollection("roles")
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
