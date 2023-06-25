<template>
    <NuxtLayout name="dashboardlayout">
        <h1 class="text-2xl text-center font-semibold my-9"> NUXT 3 meta Tag Generator</h1>
        <MetaTags title="Dashboard" description="This is the dashboard page"/>
        <div class="grid gird-cols-2 gap-6">
            <form class="flex flex-col space-y-4" @submit.prevent="generate">
                <FormGroup type="text" label="Enter page title" v-model="form.title"/>
                <FormGroup type="text" label="Enter description... up to 155 characters " v-model="form.description"/>
                <FormGroup type="text" label="Enter canonical URL" v-model="form.url"/>
                <div class="text-center">
                    <Button type="submit" class="text-gray-50 bg-slate-900 w-56">Generate</Button>
                </div>
            </form>

            <div class="relative" v-show="code.highlighted">
                <button @click="copyCode" class="absolute top-6 right-0 bg-slate-700 text-gray-50 px-2 py-1 rounded-l-md">{{ buttonText }}</button>
                <pre >
                    <code ref="codeele" class="hljs rounded-md">
                        <div v-html="code.highlighted"></div>
                    </code>
                </pre>
            </div>


        </div>
    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth']
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
