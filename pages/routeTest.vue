<template>
    <div>
        <h1>Route Test</h1>
        <p>Route Test</p>
    </div>
</template>


<script setup>
    definePageMeta({
        middleware: ['auth', 'access-level-check'], // Include your middleware here
        meta: {
            requiredAccess: 2 // Specify the required access level here
        }
    })
</script>

