<template>
    <NuxtLayout name="dashboardlayout">
        Here will go the content of the dashboard! (And it will be cool)
    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth','access-level-check'], // Include your middleware here
        meta: {
            requiredAccess: 1 // Specify the required access level here
        }
    })
   

    import highlightjs from "highlight.js"
    const form = reactive({
        title: "",
        site: "",
        type: "",
        description: "",
        url: "",
    })

    const codeele = ref()
    useHead({
    link: [
        {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css",
        integrity: "sha512-rO+olRTkcf304DQBxSWxln8JXCzTHlKnIdnMUwYvQa9/Jd4cQaNkItIUj6Z4nvW1dqK0SKXLbn9h4KwZTNtAyw==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
        },
    ],
    })

    const code = reactive({
        actual: "",
        highlighted: "",
    })

    const buttonText = ref("Copy")

    function generate() {
    code.actual = `
        <Head>
            <Title>${form.title} </Title>
            <Meta name="description" content="${form.description}" />
            <Meta property="og:title" content="${form.title}" />
            <Meta property="og:description" content="${form.description}" />
            <Meta property="og:url" content="${form.url}" />
            <Meta property="og:type" content="${form.type}" />
            <Meta property="og:site_name" content="${form.site}" />
        </Head>`
    code.highlighted = highlightjs.highlight(code.actual, { language: "html" }).value
    }

    function copyCode() {
    navigator.clipboard.writeText(code.actual)
    buttonText.value = "Copied!"
    setTimeout(() => {
        buttonText.value = "Copy"
    }, 2000)
    }
</script>
