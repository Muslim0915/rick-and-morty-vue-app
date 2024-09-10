<script lang="ts" setup>
import type { ICharacterCard, IEpisodeCard } from '@/services/typing/interfaces';
import { useRoute } from 'vue-router';
import { useRickAndMortyStore } from '@/store';
import { computed, onMounted, ref } from 'vue';
import GoBackButton from '@/components/ui/GoBackButton.vue';
import CharacterDetailsItem from '@/components/CharacterDetailsItem.vue';

const store = useRickAndMortyStore();
const route = useRoute();
const episodes = ref<Array<IEpisodeCard>>([]);
const character = ref<ICharacterCard | null>(null);

const loadCharacterData = async (id: number) => {
  store.state.isLoading = true;
  try {
    let char = store.state.character.results?.find((item: ICharacterCard) => item.id === id);

    if (!char) {
      await store.fetchApiData('character',id);
      char = store.state.character.results?.find((item: ICharacterCard) => item.id === id);
    }
    character.value = char || null;
  } finally {
    store.state.isLoading = false;
  }
};

const slicedIdFromLocation = computed(()=>{
  if (character.value && character.value.location) {
    return character.value.location.url.split("/").slice(-1)[0];
  }
  return null;
})

onMounted(async () => {
  const characterId = Number(route.params.id);
  await loadCharacterData(characterId);

  if (character.value && character.value.episode) {
    const fetchedEpisodes = await store.fetchAdditionalData(character.value, character.value.episode);
    if (fetchedEpisodes) {
      episodes.value = fetchedEpisodes;
    }
  }
});
</script>

<template>
  <section class="w-full flex flex-col" v-if="character">
    <div class="container">
      <div class="w-full relative flex flex-col items-center gap-4 justify-center py-3 px-4">
        <GoBackButton />
        <img
            :src="character.image"
            :alt="character.name"
            width="300"
            height="300"
            class="rounded-full"
        />
        <h2 class="font-bold text-5xl uppercase text-blue-900">{{ character.name }}</h2>
      </div>

      <div class="flex justify-between my-10 max-md:flex-col">
        <div class="flex flex-col w-1/4 max-md:w-full max-md:mb-16">
          <h2 class="text-gray-400 text-2xl mb-5">Informations</h2>
          <div class="flex flex-col max-md:w-full">
            <CharacterDetailsItem label="Gender" :value="character.gender" />
            <CharacterDetailsItem label="Status" :value="character.status" />
            <CharacterDetailsItem label="Species" :value="character.species" />
            <CharacterDetailsItem label="Origin" :value="character.origin.name" />
            <CharacterDetailsItem label="Created" :value="character.created" />
            <div class="flex justify-between items-center border-b border-gray-300 cursor-pointer" @click="$router.push(`/location/${slicedIdFromLocation}`)">
            <CharacterDetailsItem label="Location" :value="character.location.name" class="border-b-0" />
              <div class="rotate-180">
                <img src="/images/svg/arrow_back_24px.svg" alt="arrow back" width="24" height="24" class="bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col" v-if="episodes.length">
          <h2 class="text-gray-400 text-2xl mb-5">Episodes</h2>
          <div
              v-for="episode in episodes"
              :key="episode.id"
              class="flex justify-between items-center border-b border-gray-300 cursor-pointer"
              @click="$router.push(`/episode/${episode.id}`)"
          >
            <CharacterDetailsItem
                :value="episode.name"
                :label="episode.episode"
                class="border-b-0"
            >
              {{ episode.air_date }}
            </CharacterDetailsItem>
            <div class="rotate-180">
              <img src="/images/svg/arrow_back_24px.svg" alt="arrow back" width="24" height="24" class="bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
