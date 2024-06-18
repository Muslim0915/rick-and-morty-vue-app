<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="flex flex-col py-3 border-b border-gray-300 max-md:w-full">
    <h4 class="font-bold text-xl capitalize">{{ label }}</h4>
    <p class="text-md text-gray-400">{{ value }}</p>
    <p class="text-md text-gray-400"><slot /></p>
  </div>
</template>
