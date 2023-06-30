<template>
  <div @click="$emit('closeModal')" class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-deep/75">
    <div @click.stop class="text-center max-h-[200px] max-w-[200px] h-full w-full flex flex-col items-center justify-center">
      <div class="w-full h-max flex items-center justify-center gap-4">
        <button v-for="loc in locales" :class="[loc.code==locale?'bg-crimson':'bg-background','w-[50px] h-full shrink-0 hover:transform hover:translate-y-[-4px] transition-trasnform transition-200 p-4']" @click="setLocale(loc.code); $emit('closeModal')">{{ loc.code }}</button>
      </div>
      <button @click="$emit('closeModal')" class="bg-background text-acccent font-bold text-lg text-center rounded-lg px-8 py-2 hover:bg-crimson/90 mt-8">{{ $t('cancel') }}</button>
    </div>
  </div>
</template>

<script setup>
const { locales, locale, setLocale } = useI18n()
const lang = useState('langStore', () => null)
const language = computed({
  get: () => locale.value,
  set: (val) => {
    setLocale(val)
    lang.value = val //store the value in the local storage
  }
})
/*
  EMITS
*/
defineEmits(['closeModal'])
</script>