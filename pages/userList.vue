<template>
    <NuxtLayout name="dashboardlayout">
        <User v-for="user in users.data" :username="user.displayName" :accessLevel="user.accessLevel" :email="user.email" :userIcon="user.userIcon" :userId="user.uid" :id="user.uid"/>
    </NuxtLayout>
</template>

<script setup>
    const { subscribeCollection, updateDocument } = useFirestore()

    const users = ref([])
    users.value = await useFetch('/api/firestore/users')
    console.log(users.value.data);
    const isPending = ref(false)

    // Client side hydration
    onMounted(() => {
        users.value.data = subscribeCollection("users") 
    })
</script>
