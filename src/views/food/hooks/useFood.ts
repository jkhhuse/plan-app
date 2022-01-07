import { Food } from "@/types/food";
import { ref, watch } from "@vue/runtime-core";
import { useDebounce } from "@/utils/useDebounce";
import { searchFoodAction } from "@/action/food";
import { HttpMessage } from "@/types";

export default function useFood(): any {
  const foods = ref<Food[]>([]);
  const loading = ref<boolean>(false);
  const keyword = ref<string>("");
  const input = useDebounce(keyword);

  watch(
    () => input.value,
    () => {
      loading.value = true;
      searchFoodAction(input.value).subscribe((res: HttpMessage<Food[]>) => {
        if (res.code === "200") {
          foods.value = res.data;
        }
        loading.value = false;
      });
    },
    {
      immediate: true,
    },
  );

  return {
    foods,
    loading,
    keyword,
    input,
  };
}
