// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    componentIslands: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: { //i18n module options
  },
  app: {
    head: {
      title: 'Title goes here',
      meta: [
        {name: 'name goes here', content: 'content goes here'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
        { rel: 'icon', type: 'image/png', href: '/MWD_logo(t).png' }
      ]
    }
  }
})
