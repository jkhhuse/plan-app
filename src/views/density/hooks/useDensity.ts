import { getDensityList } from "@/action/density";
import { HttpMessage } from "@/types";
import { DensityList } from "@/types/density";
import { onMounted, ref, watch } from "@vue/runtime-dom";

export default function useDensity(): any {
  const densityList = ref<DensityList>([]);
  const loadFinished = ref<boolean>(false);
  const finishedText = ref<string>("");
  const loading = ref<boolean>(true);
  const limit = ref<number>(1);
  const size = ref<number>(20);

  const fetchDensityList = (limit: number, size: number) => {
    getDensityList(limit, size).subscribe((res: HttpMessage<DensityList>) => {
      if (res.data.length > 0) {
        densityList.value = densityList.value.concat(res.data);
        loading.value = false;
      } else {
        loadFinished.value = false;
      }
    });
  };

  watch(
    () => limit.value,
    () => {
      fetchDensityList(limit.value, size.value);
    },
  );

  onMounted(() => {
    fetchDensityList(limit.value, size.value);
  });

  return {
    densityList,
    loadFinished,
    finishedText,
    loading,
    limit,
    size,
  };
}
