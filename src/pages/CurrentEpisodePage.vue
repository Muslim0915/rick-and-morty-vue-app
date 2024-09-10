<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useRickAndMortyStore } from '@/store';
import {  onMounted, ref } from 'vue';

import GoBackButton from '@/components/ui/GoBackButton.vue';
import CharacterCard from '@/components/CharacterCard.vue';

import type { ICharacterCard, IEpisodeCard } from '@/services/typing/interfaces';

const store = useRickAndMortyStore();
const route = useRoute();
const characters = ref<Array<ICharacterCard>>([]);
const episode = ref<IEpisodeCard | null>(null);

const loadEpisodeData = async (id: number) => {
  store.state.isLoading = true;
  try {
    let ep = store.state.episode.results?.find((item: IEpisodeCard) => item.id === id);

    if (!ep) {
      await store.fetchApiData('episode',id);
      ep = store.state.episode.results?.find((item: IEpisodeCard) => item.id === id);
    }
    episode.value = ep || null;
  }
  catch (error) {
    console.log(error)
  }
    store.state.isLoading = false;
};

onMounted(async () => {
  const episodeId = Number(route.params.id);
  await loadEpisodeData(episodeId);

  if (episode.value && episode.value.characters) {
    const fetchedCharacters = await store.fetchAdditionalData(episode.value, episode.value.characters);
    if (fetchedCharacters) {
      characters.value = fetchedCharacters;
    }
  }
});
</script>

<template>
  <section class="w-full flex flex-col">
    <div class="container">
      <div class="w-full relative flex flex-col items-center gap-4 justify-center py-3 px-4">
        <GoBackButton />
        <div class="flex flex-col w-full text-center items-center gap-5">
          <h2 class="font-bold text-7xl uppercase text-blue-900 max-md:text-3xl max-sm:text-xl">{{ episode?.name }}</h2>
          <div class="flex w-full justify-center gap-52 max-sm:gap-10 max-sm:flex-col">
            <div class="flex flex-col gap-1">
              <h4 class="text-black font-bold text-xl">Episode:</h4>
              <span class="font-bold text-lg text-gray-400">{{ episode?.episode }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-black font-bold text-xl">Date:</h4>
              <span class="font-bold text-lg text-gray-400"> {{ episode?.air_date }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
          class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-14 place-items-center py-10">
        <CharacterCard
            v-for="item in characters"
            :key="item.id"
            :item="item"
            @click="$router.push(`/character/${item.id}`)"
        />
      </div>
    </div>
  </section>
</template>
