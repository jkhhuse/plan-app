import { ref, Ref, watch } from "vue";
import { useDebounceFn } from "./useDebounceFn";

export function useDebounce<T>(value: Ref<T>, delay = 200): Ref<T> {
  if (delay <= 0) return value;

  const debounced: Ref<T> = ref(value.value as T) as Ref<T>;

  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, delay);

  watch(value, () => updater());

  return debounced;
}
