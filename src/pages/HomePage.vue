<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import PageImage from '@/components/PageImage.vue';

import { ref, computed, watch } from 'vue';
import { useRickAndMortyStore } from '@/store';

import type { ICharacterCard, IOptionItem } from '@/services/typing/interfaces';

const searchQuery = ref<string>('');
const selectedSpecies = ref<string>('');
const selectedGender = ref<string>('');
const selectedStatus = ref<string>('');
const filteredCharacters = ref<ICharacterCard[]>([]);

const store = useRickAndMortyStore();

const speciesOptions: IOptionItem[] = [
  { id: 1, value: 'Human', label: 'Human' },
  { id: 2, value: 'Alien', label: 'Alien' },
];

const genderOptions: IOptionItem[] = [
  { id: 1, value: 'Male', label: 'Male' },
  { id: 2, value: 'Female', label: 'Female' },
];

const statusOptions: IOptionItem[] = [
  { id: 1, value: 'Alive', label: 'Alive' },
  { id: 2, value: 'Dead', label: 'Dead' },
  { id: 3, value: 'unknown', label: 'unknown' },
];

const searchByName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value.toLowerCase();
};

const applyFilters = () => {
  if (store.state.character.results) {
    filteredCharacters.value = store.state.character.results.filter((character: ICharacterCard) => {
      const matchesName = character.name.toLowerCase().includes(searchQuery.value);
      const matchesSpecies = selectedSpecies.value ? character.species === selectedSpecies.value : true;
      const matchesGender = selectedGender.value ? character.gender === selectedGender.value : true;
      const matchesStatus = selectedStatus.value ? character.status === selectedStatus.value : true;

      return matchesName && matchesSpecies && matchesGender && matchesStatus;
    });
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedSpecies.value = '';
  selectedGender.value = '';
  selectedStatus.value = '';
};

watch([searchQuery, selectedSpecies, selectedGender, selectedStatus], applyFilters);
watch(() => store.state.character.results, applyFilters, { immediate: true });

const characters = computed(() => filteredCharacters.value);
</script>

<template>
  <section class="w-full flex flex-col">
    <div class="container">
      <PageImage src="/images/png/rick-and-morty_home-page.png" />
      <div class="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5">
        <AppInput
            type="search"
            :modelValue="searchQuery"
            @input="searchByName"
            placeholder="Filter by name..."
        />
        <AppSelect
            :options="speciesOptions"
            label="Species"
            v-model="selectedSpecies"
        />
        <AppSelect
            :options="genderOptions"
            label="Gender"
            v-model="selectedGender"
        />
        <AppSelect
            :options="statusOptions"
            label="Status"
            v-model="selectedStatus"
        />
        <AppButton class="bg-black text-white" @click="resetFilters()">reset</AppButton>
      </div>
    </div>
  </section>
  <section class="w-full flex flex-col">
    <div class="container flex flex-col">
      <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-14 place-items-center py-10">
        <CharacterCard
            v-for="character in characters"
            :key="character.id"
            :item="character"
            @click="$router.push(`/character/${character.id}`)"
        />
      </div>
      <div class="flex justify-center gap-5 self-end">
        <AppButton
            @click="store.loadPreviousData('character', store.state.character.info);"
            class=" bg-red-500 text-white hover:bg-red-600"
        >
          Previous
        </AppButton>
        <AppButton
            @click="store.loadNextData('character', store.state.character.info)"
            class="bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </AppButton>
      </div>
    </div>
  </section>
</template>
