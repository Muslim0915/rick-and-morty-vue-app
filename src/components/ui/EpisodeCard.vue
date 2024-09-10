<script lang="ts" setup>
import { IEpisodeCard } from "@/services/typing/interfaces";

interface IProps {
  item: IEpisodeCard
}
defineProps<IProps>()
</script>

<template>
  <div class="flex w-full h-full justify-center text-center shadow shadow-gray-400 hover:shadow-lg hover:shadow-gray-400 transition items-center flex-col gap-2 bg-gray-200 cursor-pointer p-5 rounded">
    <h4 class="font-bold text-xl capitalize">{{ item.name }}</h4>
    <p class="text-md text-gray-400">{{ item.air_date }}</p>
    <p class="text-md text-gray-400">{{ item.episode }}</p>
  </div>
</template>
