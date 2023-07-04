<template>
    <select v-bind="$attrs" class="w-full bg-background border border-deep rounded outline-none focus:ring focus:ring-crimson text-gray-400 transition-all duration-150 ease-in-out p-2" v-model="selected">
      <option v-for="option in options" :key="option.value" :value="option.value" @input="$emit('update:modelValue', selected.value)">
        {{ option.text }}
      </option>
    </select>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: String | Number,
    options: {
      type: Array,
      required: true
    },
    value: String | Number,
  })
  
  const selected = ref(props.value || props.modelValue || '')
  
  watchEffect(() => {
    selected.value = props.value || props.modelValue || ''
  })
  
  defineEmits(['update:modelValue'])
  
  </script>
  