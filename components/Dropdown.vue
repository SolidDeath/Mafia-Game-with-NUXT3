<template>
    <select v-bind="$attrs" class="w-full bg-background border border-deep rounded outline-none focus:ring focus:ring-crimson text-gray-400 transition-all duration-150 ease-in-out p-2" @input="$emit('update:currentValue', $event.target.value)" :value="props.currentValue">
      <option v-for="option in options" :key="option.value" :value="option.value" >
        {{ option.name }}
      </option>
    </select>
  </template>
  
  <script setup>
  const props = defineProps({
    currentValue: Number | String | Boolean,
    options: {
      type: Array,
      required: true
    },
  }) 
  defineEmits(['update:currentValue'])
  
  </script>
  