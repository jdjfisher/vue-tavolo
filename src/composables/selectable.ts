import { ref, type ComputedRef, watch, type Ref } from 'vue';
import { useKeyModifier } from '@vueuse/core';

export const useSelectable = <T>(keyBy: keyof T, rows: ComputedRef<T[] | undefined>) => {
  const selected: Ref<T[]> = ref([]);

  const meta = useKeyModifier('Meta');
  const shift = useKeyModifier('Meta');

  const rangeSelectionIndex = ref<number>();

  const comparator = (a: T) => (b: T) => a[keyBy] === b[keyBy];

  const isSelected = (row: T) => selected.value.some(comparator(row));

  const clearSelected = () => {
    selected.value.splice(0, selected.value.length);
  };

  const onRowClick = (row: T) => {
    // console.log(meta.value);
    // if (!rangeSelectionIndex.value) {
    //   rangeSelectionIndex.value = rows.value.indexOf(row);
    //   return;
    // }
    // const other = rows.value.indexOf(row);
    // const l = Math.min(rangeSelectionIndex.value, other);
    // const r = Math.max(rangeSelectionIndex.value, other);
    // for (let i = l; i <= r; i++) {
    //   selected.value = [...selected.value, rows.value[i]];
    // }
    // rangeSelectionIndex.value = undefined;

    if (isSelected(row)) {
      selected.value.splice(selected.value.findIndex(comparator(row)), 1);
    } else {
      selected.value.push(row);
    }
  };

  watch(rows, clearSelected);

  return {
    selected,
    isSelected,
    onRowClick,
    clearSelected,
  };
};
