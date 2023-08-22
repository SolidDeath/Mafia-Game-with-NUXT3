<template>
    <div class="flex flex-col space-y-2">
        <Label>{{label}}</Label>
        <Input v-if="type !== 'checkbox'" :type="type" :value="modelValue" :placeholder="placeholder"
               @input="$emit('update:modelValue', $event.target.value)"/>
        <Input v-else :type="type" :checked="modelValue" :placeholder="placeholder"
               @change="$emit('update:modelValue', $event.target.checked)"/>
        <p v-if="errorMessage" class="text-red-500 text-sm">{{errorMessage}}</p>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    type: String,
    placeholder: String,
    modelValue: String | Number | Boolean,
    errorMessage: String
})

defineEmits(['update:modelValue'])
</script>
