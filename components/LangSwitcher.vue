<template>
    <div>
        Switch Language:
        <select v-model="language">
            <option 
                v-for="item in locales" 
                :key="typeof item === 'object' ? item.code : item" 
                :value="typeof item === 'object' ? item.code : item" 
            >
                    {{ typeof item === 'object' ? item.name : item }}
            </option>
        </select>
    </div>
</template>

<script setup>
    const { locales, locale, setLocale } = useI18n()
    const lang = useState('langStore', () => null)

    const language = computed({
        get: () => locale.value,
        set: (val) => {
            setLocale(val)
            lang.value = val
        }
    })
</script>
