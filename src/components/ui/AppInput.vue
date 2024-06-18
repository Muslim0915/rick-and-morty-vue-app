<script lang="ts" setup>
defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
});
</script>

<template>
  <div class="flex justify-between items-center p-4 gap-2 border border-gray-400 rounded">
    <img src="/images/svg/search-icon.svg" alt="search-icon">
    <input
        :type="type"
        class="bg-transparent flex-1 outline-0"
        :placeholder="placeholder"
        :value="modelValue"
    >
  </div>
</template>
