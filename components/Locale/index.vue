<template>
    <div class="w-[50px] overflow-hidden flex flex-row md:hover:w-[100px] transition-all transition-200 cursor-pointer fixed h-[50px] bottom-2 right-2 rounded-xl bg-crimson font-bold drop-shadow-xl">
      <button v-for="el in locales" :class="[el.code==locale?'order-1':'order-2','hidden md:block w-[50px] h-full shrink-0 hover:bg-accent/5']" @click="setLocale(el.code)">{{ el.code }}</button>
      <button class="w-[50px] h-full shrink-0 md:hidden" @click="$emit('openLocale')">{{ locale }}</button>
    </div>
</template>

<script setup>
    const { locales, locale, setLocale } = useI18n()
    const lang = useState('langStore', () => null)
    defineEmits(['openLocale'])
    const language = computed({
        get: () => locale.value,
        set: (val) => {
            setLocale(val)
            lang.value = val //store the value in the local storage
        }
    })
</script>
