<script setup lang="ts">
import type { Paginator } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  paginator: Paginator;
  loading: boolean;
}>();

const emit = defineEmits<{
  'update:page': [number];
}>();

const page = computed<number>({
  get() {
    return props.paginator.page;
  },
  set(page) {
    emit('update:page', page);
  },
});
</script>

<template>
  <div>
    <button type="button" @click="page--" :disabled="loading || page === 1">Previous</button>
    <button type="button" @click="page++" :disabled="loading || page === paginator.last">
      Next
    </button>

    <span>Page {{ paginator.page }} of {{ paginator.last }}</span>

    <button type="button" @click="page = 1" :disabled="loading || page === 1">First</button>
    <button
      type="button"
      @click="page = paginator.last"
      :disabled="loading || page === paginator.last"
    >
      Last
    </button>
  </div>
</template>
