<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { IOptionItem } from '@/services/typing/interfaces';

interface IProps {
  options: IOptionItem[],
  label: string,
}

defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <select
      class="app-select px-4 py-2 border border-gray-400 rounded outline-none appearance-none"
      @change="handleChange"
  >
    <option value="" disabled selected>{{ label }}</option>
    <option
        v-for="option in options"
        :key="option.id"
        :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.app-select {
  background-image: url('/images/svg/arrow-drop-down.svg');
  background-repeat: no-repeat;
  background-position: right 10px center;
}
</style>
