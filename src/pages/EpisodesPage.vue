<script setup lang="ts">
import PageImage from '@/components/PageImage.vue';
import AppInput from '@/components/ui/AppInput.vue';
import EpisodeCard from '@/components/ui/EpisodeCard.vue';
import AppButton from '@/components/ui/AppButton.vue';

import { useRickAndMortyStore } from '@/store';
import { computed, ref, watch, onMounted } from 'vue';

import type { IEpisodeCard } from '@/services/typing/interfaces';

const searchQuery = ref<string>('');
const filteredEpisodes = ref<IEpisodeCard[]>([]);

const store = useRickAndMortyStore();

const applyFilters = () => {
  if (store.state.episode.results) {
    filteredEpisodes.value = store.state.episode.results.filter((episode: IEpisodeCard) => {
      return episode.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }
};

const episodes = computed(() => filteredEpisodes.value);

watch(searchQuery, applyFilters);
watch(() => store.state.episode.results, applyFilters, { immediate: true });

onMounted(() => {
  if (!store.state.episode.results || store.state.episode.results.length === 0) {
    store.getApi().then(() => {
      filteredEpisodes.value = store.state.episode.results;
      applyFilters();
    });
  } else {
    filteredEpisodes.value = store.state.episode.results;
    applyFilters();
  }
});
</script>

<template>
  <section class="w-full flex flex-col">
    <div class="container flex flex-col">
      <PageImage src="/images/png/rick-and-morty_episodes-page.png"/>
      <div class="w-full flex items-center justify-center mt-10">
        <AppInput
            v-model="searchQuery"
            placeholder="Search episode"
            class="w-full"
        />
      </div>
      <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-14 place-items-center mt-10">
        <EpisodeCard
            v-for="item in episodes"
            :key="item.id"
            :item="item"
            @click="$router.push(`/episode/${item.id}`)"
        />
      </div>
      <div class="flex gap-5 items-center self-end mt-10">
        <AppButton
            @click="store.loadPreviousData('episode', store.state.episode.info);"
            class="bg-red-500 text-white hover:bg-red-600"
        >
          Previous
        </AppButton>
        <AppButton
            @click="store.loadNextData('episode', store.state.episode.info)"
            class="bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </AppButton>
      </div>
    </div>
  </section>
</template>
