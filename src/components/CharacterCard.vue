<script lang="ts" setup>
import type { ICharacterCard } from '@/services/typing/interfaces/ICharacterCard.ts';

interface IProps {
  item: ICharacterCard
}

defineProps<IProps>();

</script>

<template>
  <div class="w-full max-w-[240px] flex flex-col items-center shadow-md rounded shadow-gray-400 cursor-pointer">
    <img
        :src="item.image"
        :alt="item.name"
        width="240"
        height="240"
        loading="lazy"
    />
    <div class="w-full flex flex-col justify-center py-3 px-4">
      <h3 class="font-bold text-xl">{{ item.name }}</h3>
      <p class="text-md text-gray-400">{{ item.status }}</p>
    </div>

  </div>
</template>
