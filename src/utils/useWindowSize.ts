import { ref } from "@vue/runtime-core";
import { getCurrentInstance, nextTick, onMounted } from "@vue/runtime-dom";

export function useWindowSize(): any {
  const width = ref<number>(0);
  const height = ref<number>(0);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  if (getCurrentInstance()) {
    onMounted(update);
  } else {
    nextTick(update);
  }

  document.addEventListener("resize", update);

  return {
    width,
    height,
  };
}

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>;
