<script lang="ts" setup>

defineProps({
  src: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="w-full flex my-4 justify-center items-center">
    <img :src="src" alt="rick-and-morty">
  </div>
</template>

<style lang="scss" scoped>

</style>
