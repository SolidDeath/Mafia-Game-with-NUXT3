<template>
    <div>
        <User v-for="user in users" :username="user.displayName" :accessLevel="user.accessLevel" :email="user.email" :userIcon="user.userIcon" :userId="user.uid"/>
        {{ users }}
    </div>
</template>

<script setup>
    const { subscribeCollection, getCollection, updateDocument } = useFirestore()

    const users = ref([])
    const isPending = ref(false)

    users.value = useFetch("../api/firestore/users")

    onMounted(() => {
        users.value = subscribeCollection("users")
        console.log(users.value);
    })
</script>
