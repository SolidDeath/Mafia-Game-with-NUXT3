<template>
  <input v-bind="$attrs" class="w-full bg-background border border-deep rounded outline-none focus:ring focus:ring-crimson text-gray-400 transition-all duration-150 ease-in-out p-2" autocomplete="off" :value="value" @input="$emit('update:modelValue', $event.target.value)" />
  <!-- TODO: $event.target.modelValue -->
</template>

<script setup>
   defineProps({
    modelValue: String | Number,
    value: String | Number,
   })
    defineEmits(['update:modelValue'])
</script>
