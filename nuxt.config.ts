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
    lazy: true, //enable lazy loading
    langDir: 'locales/', //directory where language files (locales) are stored
    strategy: 'prefix_except_default', //strategy for choosing locale
    locales: [
      {
        code: 'en-US',
        iso: 'en-US',
        name: 'English(US)',
        file: 'en-US.json'
      },
      {
        code: 'lv-LV',
        iso: 'lv-LV',
        name: 'Latviešu',
        file: 'lv-LV.json'
      }
    ],
    defaultLocale: 'en-US',
  }
  
})
