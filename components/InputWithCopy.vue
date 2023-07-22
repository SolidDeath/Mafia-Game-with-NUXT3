<template>
    <div class="w-full bg-background border border-deep rounded outline-none transition-all duration-150 ease-in-out flex items-center">
      <input v-bind="$attrs" v-model="inputValue" class="flex-grow bg-background text-gray-400 outline-none px-2" autocomplete="off" disabled/>
      <button @click.prevent="copyCode" class=" bg-crimson text-white rounded px-2 py-2">
        <span class="material-icons align-middle">{{ buttonText }}</span>
      </button>
    </div>
  </template>
  
  <script setup>

  const props = defineProps({
    modelValue: String | Number,
    value: String | Number,
  })
  
  const inputValue = ref(props.value || props.modelValue || '')
  const buttonText = ref("content_copy") // Use Material Icon for "copy"
  
  const copyCode = () => {
    navigator.clipboard.writeText(inputValue.value)
    buttonText.value = "check" // Use Material Icon for "copied"
    setTimeout(() => {
      buttonText.value = "content_copy" // Reset to Material Icon for "copy"
    }, 2000)
  }
  
  
  </script>
    