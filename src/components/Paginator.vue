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

const start = computed(() => (page.value - 1) * props.paginator.perPage + 1);

const end = computed(() => Math.min(page.value * props.paginator.perPage, props.paginator.count));
</script>

<template>
  <div>
    <button type="button" @click="page--" :disabled="loading || page === 1">Previous</button>
    <button type="button" @click="page++" :disabled="loading || page === paginator.lastPage">
      Next
    </button>

    <span> Page {{ paginator.page }} of {{ paginator.lastPage }} </span>
    <span> Showing {{ start }} - {{ end }} </span>

    <button type="button" @click="page = 1" :disabled="loading || page === 1">First</button>
    <button
      type="button"
      @click="page = paginator.lastPage"
      :disabled="loading || page === paginator.lastPage"
    >
      Last
    </button>
  </div>
</template>
