<script setup lang="ts" generic="T">
import type { Resolver, PaginatedData, Classes } from '@/types';
import Paginator from '@/components/Paginator.vue';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  keyBy: keyof T;
  resolver: Resolver<T>;
  classes?: Classes;
}>();

let abortController: AbortController;

const page = ref(1);
const loading = ref(false);

const data = ref<PaginatedData<T> | undefined>();

async function index() {
  loading.value = true;
  abortController?.abort();
  abortController = new AbortController();

  const params = {
    abortSignal: abortController.signal,
    page: page.value,
  };

  try {
    data.value = await props.resolver(params);
  } finally {
    loading.value = false;
  }
}

function clear() {
  abortController?.abort();
  data.value = undefined;
  page.value = 1;
}

const rows = computed(() => data.value?.rows);

watch(page, index);

onMounted(index);

defineExpose({
  index,
  clear,
});
</script>

<template>
  <div>
    <div>
      <slot name="head">Head</slot>
    </div>

    <Transition mode="out-in">
      <div v-if="rows === undefined">
        <slot name="inital-loading"> Loading </slot>
      </div>

      <div v-else-if="rows.length === 0">
        <slot name="no-results"> No results </slot>
      </div>

      <div v-else>
        <div v-for="row in rows" :key="row[keyBy]" :class="classes?.row">
          <slot name="row" v-bind="{ row, loading }">
            {{ row }}
          </slot>
        </div>
      </div>
    </Transition>

    <Paginator
      v-if="data"
      :paginator="data.paginator"
      :loading="loading"
      @update:page="(value) => (page = value)"
    />
  </div>
</template>
