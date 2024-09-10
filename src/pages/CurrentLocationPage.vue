<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {useRickAndMortyStore} from '@/store';
import { onMounted, ref } from "vue";
import type {ICharacterCard, ILocationCard} from '@/services/typing/interfaces';
import GoBackButton from '@/components/ui/GoBackButton.vue';
import CharacterCard from '@/components/CharacterCard.vue';

const characters = ref<Array<ICharacterCard>>([]);
const location = ref<ILocationCard | null>(null);

const store = useRickAndMortyStore();
const route = useRoute();

const loadLocationData = async (id: number) => {
  store.state.isLoading = true;
  try {
    let loc = store.state.location.results?.find((item: ILocationCard) => item.id === id);

    if (!loc) {
      await store.fetchApiData('location',id);
      loc = store.state.location.results?.find((item: ILocationCard) => item.id === id);
    }
    location.value = loc || null;
  }
  catch (error) {
    console.log(error)
  }
    store.state.isLoading = false;
};

onMounted(async () => {
  const locationId = Number(route.params.id);
  await loadLocationData(locationId);

  if (location.value && location.value.residents) {
    const fetchedCharacters = await store.fetchAdditionalData(location.value, location.value.residents);
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
        <GoBackButton/>
        <div class="flex flex-col w-full text-center items-center gap-5">
          <h2 class="font-bold text-7xl max-md:text-3xl max-sm:text-xl uppercase text-blue-900">{{ location?.name }}</h2>
          <div class="flex w-full justify-center gap-52 max-md:gap-10 max-sm:flex-col">
            <div class="flex flex-col gap-1">
              <h4 class="text-black font-bold text-xl">Type:</h4>
              <span class="font-bold text-lg text-gray-400">{{ location?.type }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-black font-bold text-xl">Dimension:</h4>
              <span class="font-bold text-lg text-gray-400"> {{ location?.dimension }}</span>
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
