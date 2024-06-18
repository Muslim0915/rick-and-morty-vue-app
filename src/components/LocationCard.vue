<script lang="ts" setup>
import { ILocationCard } from '@/services/typing/interfaces';
import {computed} from "vue";

interface IProps {
  item: ILocationCard,
}
const props = defineProps<IProps>();

const formattedCreatedDate = computed(() => {
  const date = new Date(props.item.created);
  return date.toLocaleDateString();
});
</script>

<template>
  <div class="flex w-full h-full justify-center text-center shadow shadow-gray-400 hover:shadow-lg hover:shadow-gray-400 transition items-center flex-col gap-2 bg-gray-200 cursor-pointer p-5 rounded">
    <h2 class="font-bold text-2xl">
      {{ item.name }}
    </h2>
    <p class="text-gray-600"> {{ formattedCreatedDate }} </p>
    <p class="text-gray-600"> {{ item.type }} </p>
  </div>
</template>
