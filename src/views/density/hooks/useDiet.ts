import { addDietAction, getDietAction } from "@/action/diet";
import { HttpMessage } from "@/types";
import { Diet, DietType, DIET_TYPE_COLUMNS } from "@/types/diet";
import { combineTime } from "@/utils/tool";
import { ref, watch } from "@vue/runtime-dom";
import { Notify } from "vant";
import { onMounted } from "vue";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export default function useDiet(route: RouteLocationNormalizedLoaded, router: Router): any {
  const showDietTimePicker = ref<boolean>(false);
  const showDietTypePicker = ref<boolean>(false);
  const diet = ref<Diet>({} as Diet);
  const dietTypeColumns = DIET_TYPE_COLUMNS;
  const title = ref<string>("");

  onMounted(() => {
    // 编辑场景
    if (route?.path?.includes("editDiet")) {
      title.value = "更新饮食记录";
      getDietAction(route.params.dietId as string).subscribe((res: HttpMessage<Diet>) => {
        if (res.code === "200") {
          diet.value = res.data;
        }
      });
    } else {
      title.value = route.params.date + " 饮食";
      diet.value = {
        dietContent: "",
        dietTime: combineTime(route.params.date as string, "00:00"),
        dietType: DietType.SPECIAL_MILK,
        pheValue: 0,
        specialMilk: 0,
        breastMilk: 0,
      };
    }
  });

  watch(
    () => diet.value.breastMilk,
    () => {
      diet.value.pheValue = +(+diet.value.breastMilk * 0.36).toFixed(2);
    },
  );

  watch(
    () => diet.value.specialMilk,
    () => {
      diet.value.pheValue = 0;
    },
  );

  const onClickLeft = () => {
    router.push("/main/density/displayDiet");
  };

  const onClickRight = () => {
    router.push("/main/density");
  };

  const showDietTimePopup = () => {
    showDietTimePicker.value = true;
  };

  const showDietTypePopup = () => {
    showDietTypePicker.value = true;
  };

  const setDietTime = (currentTime: string) => {
    diet.value.dietTime = combineTime(diet.value.dietTime, currentTime);
    showDietTimePicker.value = false;
  };

  const setDietType = (type: string) => {
    diet.value.dietType = dietTypeColumns.indexOf(type);
    showDietTypePicker.value = false;
  };

  const saveDiet = () => {
    addDietAction(diet.value).subscribe((res: HttpMessage<string>) => {
      if (res.code === "200") {
        Notify({ type: "success", message: "添加成功" });
      } else {
        Notify({ type: "warning", message: "添加失败" });
      }
    });
  };

  return {
    title,
    diet,
    dietTypeColumns,
    showDietTimePicker,
    showDietTypePicker,
    onClickLeft,
    onClickRight,
    showDietTimePopup,
    showDietTypePopup,
    setDietTime,
    setDietType,
    saveDiet,
  };
}