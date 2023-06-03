<script setup lang="ts" generic="T extends Record<string, any>">
import type { Resolver, PaginatedData, Classes } from '@/types';
import Paginator from '@/components/Paginator.vue';
import Row from '@/components/Row.vue';
import { computed, onMounted, ref, toValue, watch } from 'vue';
import { useSelectable } from '@/composables/selectable';
import type { KeyableField } from '@/types';

const props = defineProps<{
  keyBy: KeyableField<T>;
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

const keyBy = computed(() => props.keyBy);

const { selected, isSelected, onRowClick, clearSelected } = useSelectable<T>(props.keyBy, rows);

watch(page, index);

onMounted(index);

const emit = defineEmits<{
  selected: [T[]];
}>();

watch(selected, () => emit('selected', toValue(selected)));

defineExpose({
  index,
  clear,
  selected,
  clearSelected,
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
        <Row
          v-for="row in rows"
          :key="row[keyBy]"
          :classes="classes"
          :row="row"
          :selected="isSelected(row)"
          @click="() => onRowClick(row)"
        >
          <template #default="params">
            <slot name="row" v-bind="{ loading, ...params }">
              {{ row }}
            </slot>
          </template>
        </Row>
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
