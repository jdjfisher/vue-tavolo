<script setup lang="ts" generic="T">
import type { Classes } from '@/types';

defineProps<{
  row: T;
  classes?: Classes;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <div :class="[classes?.row, selected ? classes?.rowSelected : undefined]" @click="emit('click')">
    <slot v-bind="{ row, selected }">
      {{ row }}
    </slot>
  </div>
</template>
