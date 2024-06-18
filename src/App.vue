<script lang='ts' setup>

import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { onMounted } from "vue";
import { useRickAndMortyStore } from "@/store";
import AppLoader from "@/AppLoader.vue";

const store = useRickAndMortyStore();

onMounted(() => {
  store.getApi();
})
</script>

<template>
  <AppLoader v-if="store.state.isLoading" />
  <div class="w-full h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-1 mt-32">
      <router-view/>
    </main>
    <AppFooter />
  </div>
</template>