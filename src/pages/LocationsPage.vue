<script setup lang="ts">
import PageImage from '@/components/PageImage.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import LocationCard from '@/components/LocationCard.vue';

import { useRickAndMortyStore } from "@/store";
import { computed, ref, watch } from 'vue';

import type { ILocationCard, IOptionItem } from '@/services/typing/interfaces';

const store = useRickAndMortyStore();

const typeOption: IOptionItem[] = [
  { id: 1, value: 'Planet', label: 'Planet' },
  { id: 3, value: 'Space station', label: 'Space station' },
  { id: 4, value: 'Fantasy town', label: 'Fantasy town' },
  { id: 5, value: 'unknown', label: 'unknown' },
  { id: 6, value: 'Cluster', label: 'Cluster' },
];
const dimensionOption: IOptionItem[] = [
  { id: 1, value: 'Dimension C-137', label: 'C-137' },
  { id: 2, value: 'Post-Apocalyptic Dimension', label: 'Post-Apocalyptic' },
  { id: 2, value: 'Replacement Dimension', label: 'Replacement' },
  { id: 3, value: 'Cronenberg Dimension', label: 'Cronenberg' },
  { id: 4, value: 'Fantasy Dimension', label: 'Fantasy' },
  { id: 5, value: 'unknown', label: 'unknown' },
  { id: 6, value: 'Dimension 5-126', label: '5-126' },
];
const searchQuery = ref<string>('');
const selectedType = ref<string>('');
const selectedDimension = ref<string>('');
const filteredLocations = ref<ILocationCard[]>([]);

const searchByName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value.toLowerCase();
};

const applyFilters = () => {
  if (store.state.location.results) {
    filteredLocations.value = store.state.location.results.filter((location: ILocationCard) => {
      const matchesName = location.name.toLowerCase().includes(searchQuery.value);
      const matchesType = selectedType.value ? location.type === selectedType.value : true;
      const matchesDimension = selectedDimension.value ? location.dimension === selectedDimension.value : true;

      return matchesName && matchesType && matchesDimension;
    });
  }
};
const resetFilters = () => {
  searchQuery.value = '';
  selectedType.value = '';
  selectedDimension.value = '';
};

watch([searchQuery, selectedType, selectedDimension], applyFilters);
watch(() => store.state.location.results, applyFilters, { immediate: true });

const locations = computed(() => filteredLocations.value);

</script>

<template>
  <section class="w-full flex flex-col">
    <div class="container flex flex-col">
      <PageImage src="/images/png/rick-and-morty_locations-page.png"/>
      <div class="grid grid-cols-1 gap-5 xl:grid-cols-4 md:grid-cols-2">
        <AppInput
            v-model="searchQuery"
            @input="searchByName"
            placeholder="Search by name"
        />
        <AppSelect
            v-model="selectedType"
            :options="typeOption"
            label="Type"
        />
        <AppSelect
            v-model="selectedDimension"
            :options="dimensionOption"
            label="Dimension"
        />
        <AppButton
            @click="resetFilters"
            class="bg-black text-white hover:bg-gray-600"
        >
          Reset
        </AppButton>
      </div>
      <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-14 py-10">
        <LocationCard
            v-for="item in locations"
            :key="item.id"
            :item="item"
            @click="$router.push(`/location/${item.id}`)"
        />
      </div>
      <div class="py-10 self-end flex gap-5">
        <AppButton
            @click="store.loadPreviousData('location', store.state.location.info)"
            class="bg-red-500 text-white hover:bg-red-600"
        >
          Previous
        </AppButton>
        <AppButton
          @click="store.loadNextData('location', store.state.location.info)"
          class="bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </AppButton>
      </div>
    </div>
  </section>
</template>
