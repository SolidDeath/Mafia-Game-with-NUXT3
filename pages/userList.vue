<template>
    <div>
        <p>{{ users }}</p>
    </div>
</template>

<script setup>
    const { subscribeCollection, getCollection, updateDocument } = useFirestore()

    const users = ref([])
    const isPending = ref(false)

    users.value = useFetch("firestore", users)

    onMounted(() => {
        users.value = subscribeCollection("users")
    })
</script>
