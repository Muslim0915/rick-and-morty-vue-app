<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
  <button @click="goBack" class="font-bold left-0 top-0 max-md:-top-10 text-2xl capitalize absolute flex items-center gap-2">
    <img src="/images/svg/arrow_back_24px.svg" alt="arrow back">
    <span class="font-bold text-2xl uppercase">Go back</span>
  </button>
</template>
