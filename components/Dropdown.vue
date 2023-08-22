<template>
    <select v-bind="$attrs" class="w-full bg-background border border-deep rounded outline-none focus:ring focus:ring-crimson text-gray-400 transition-all duration-150 ease-in-out p-2" @change="$emit('update:modelValue', $event.target.value)" :value="props.modelValue">
      <option v-for="option in options" :key="option.value" :value="option.value" >
        {{ option.name }}
      </option>
    </select>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: Number | String | Boolean,
    options: {
      type: Array,
      required: true
    },
  }) 
  defineEmits(['update:modelValue'])
  
  </script>
  