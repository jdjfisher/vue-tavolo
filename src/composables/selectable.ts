import { ref, type ComputedRef, watch, type Ref } from 'vue';

export const useSelectable = <T>(keyBy: keyof T, rows: ComputedRef<T[] | undefined>) => {
  const selected: Ref<T[]> = ref([]);

  const comparator = (a: T) => (b: T) => a[keyBy] === b[keyBy];

  const isSelected = (row: T) => selected.value.some(comparator(row));

  const clearSelected = () => {
    selected.value.splice(0, selected.value.length);
  };

  const onRowClick = (row: T) => {
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
