<template>
    <NuxtLayout name="dashboardlayout">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <User v-for="user in users.data" :displayName="user.displayName" :accessLevel="user.accessLevel" :email="user.email" :userIcon="user.iconUrl" :userId="user.uid" :id="user.uid"/>
        </div>
    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth','access-level-check'], // Include your middleware here
        meta: {
            requiredAccess: 4 // Specify the required access level here
        }
    })
    const { subscribeCollection, updateDocument } = useFirestore()

    const users = ref([])
    users.value = await useFetch('/api/firestore/users')
    console.log(users.value.data);
    const isPending = ref(false)

    // Client side hydration
    onMounted(async () => {
        users.value.data = await subscribeCollection("users") 
    })
</script>
