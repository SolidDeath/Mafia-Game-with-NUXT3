<template>
    <div>
        <h1>Middleware test page</h1>
        <p>{{$t('tool_page')}}</p>
    </div>
</template>


<script setup>
    // An example of how to use middleware to restrict access to a page, requiredAccess is the user's access level required to access the page
    definePageMeta({
        middleware: ['auth', 'access-level-check'], // Include your middleware here
        meta: {
            requiredAccess: 2 // Specify the required access level here
        }
    })
</script>

