<template>
    <div class="w-[50px] overflow-hidden flex flex-row hover:w-[100px] transition-all transition-200 cursor-pointer fixed h-[50px] bottom-10 right-10 rounded-xl bg-crimson font-bold drop-shadow-xl">
<!--        {{$t('switch_language')}}-->
<!--        <select v-model="language">-->
<!--            <option -->
<!--                v-for="item in locales" -->
<!--                :key="typeof item === 'object' ? item.code : item" -->
<!--                :value="typeof item === 'object' ? item.code : item" -->
<!--            >-->
<!--                    {{ typeof item === 'object' ? item.name : item }}-->
<!--            </option>-->
<!--        </select>-->
      <button v-for="el in locales" :class="[el.code==locale?'order-1':'order-2','w-[50px] h-full shrink-0 hover:bg-accent/5']" @click="setLocale(el.code)">{{ el.code }}</button>
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
</script>
