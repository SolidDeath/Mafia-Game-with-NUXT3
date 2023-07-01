<template>
    <div class="card">
        <div class="card-body">
            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    
                    <img :src="userIcon" class="w-24 h-24 rounded-full" />
                    <h1 class="text-2xl font-bold mt-2">{{ displayName }}</h1>
                    <p class="text-gray-500">{{ email }}</p>
                </div>
                <div class="flex flex-col items-center mt-4">
                    <div class="flex flex-row items-center">
                        <p class="text-gray-500">Access Level:</p>
                        <p class="text-gray-500 ml-2">{{ accessLevel }}</p>
                    </div>
                    <div class="flex flex-row items-center">
                        <p class="text-gray-500">User ID:</p>
                        <p class="text-gray-500 ml-2">{{ userId }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
  displayName: String,
  email: String,
  accessLevel: Number,
  userIcon: String,
  userId: String
})


</script>
