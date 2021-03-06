import { addDietAction, getDietAction, deleteDietAction } from "@/action/diet";
import { searchFoodAction } from "@/action/food";
import { HttpMessage } from "@/types";
import { Diet, DietType, DIET_TYPE_COLUMNS, SPECIAL_MILK_TYPE_COLUMNS } from "@/types/diet";
import { Food, FoodItem } from "@/types/food";
import { addMinAndSecToTime, combineTime, formatExcludeMinute } from "@/utils/tool";
import { ref, watch } from "@vue/runtime-dom";
import { Notify } from "vant";
import { onMounted } from "vue";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export default function useDiet(route: RouteLocationNormalizedLoaded, router: Router): any {
  const showDietTimePicker = ref<boolean>(false);
  const showDietTypePicker = ref<boolean>(false);
  const showSmilkTypePicker = ref<boolean>(false);
  const diet = ref<Diet>({} as Diet);
  const dietTypeColumns = DIET_TYPE_COLUMNS;
  const smilkTypeColumns = SPECIAL_MILK_TYPE_COLUMNS;
  const title = ref<string>("");
  const foodItems = ref<FoodItem[]>([]);

  onMounted(() => {
    // 编辑场景
    if (route?.path?.includes("editDiet")) {
      title.value = "更新饮食记录";
      //TODO: 食物饮食记录的编辑功能
      getDietAction(route.params.dietId as string).subscribe((res: HttpMessage<Diet>) => {
        if (res.code === "200") {
          diet.value = {
            ...res.data,
            dietTime: formatExcludeMinute(res.data.dietTime),
          };
          diet.value = {
            ...res.data,
            dietTime: formatExcludeMinute(res.data.dietTime),
          };
        }
      });
    } else {
      title.value = route.params.date + " 饮食";
      diet.value = {
        dietContent: "",
        dietTime: addMinAndSecToTime(route.params.date as string),
        dietType: DietType.SPECIAL_MILK,
        pheValue: 0,
        specialMilk: 0,
        smilkType: 0,
        breastMilk: 0,
        foodAmount: 0,
        foodUuid: "",
        foodName: "",
      };
    }
  });

  // 计算母乳 phe
  watch(
    () => diet.value.breastMilk,
    () => {
      diet.value.pheValue = +(+diet.value.breastMilk * 0.36).toFixed(2);
    },
    {
      immediate: false,
    },
  );

  // 计算特殊奶粉 phe
  watch(
    () => diet.value.specialMilk,
    () => {
      diet.value.pheValue = 0;
    },
    {
      immediate: false,
    },
  );

  // 计算食物 phe
  watch(
    [() => diet.value.foodAmount, () => diet.value.foodUuid],
    () => {
      const food = foodItems.value.find(item => item.uuid === diet.value.foodUuid);
      diet.value.pheValue = +(((food?.phe as number) * +diet.value.foodAmount) / 100).toFixed(2);
    },
    {
      immediate: false,
    },
  );

  const onClickLeft = () => {
    router.push("/main/density/displayDiet");
  };

  const onClickRight = () => {
    router.push("/main/density");
  };

  const setDietTime = (currentTime: string) => {
    diet.value.dietTime = combineTime(diet.value.dietTime, currentTime);
    showDietTimePicker.value = false;
  };

  const setDietType = (type: string) => {
    diet.value.dietType = dietTypeColumns.indexOf(type);
    showDietTypePicker.value = false;
  };

  const setSmilkType = (type: string) => {
    diet.value.smilkType = smilkTypeColumns.indexOf(type);
    showSmilkTypePicker.value = false;
  };

  const onInputEventHandler = (food: any) => {
    if (food.input) {
      // 模糊查询
      searchFoodAction(food.input).subscribe((res: HttpMessage<Food[]>) => {
        if (res.code === "200") {
          const temp: FoodItem[] = [];
          res.data.map(item => {
            temp.push({
              name: item.name,
              uuid: item.uuid,
              phe: item?.phe.includes("-") ? 0 : item?.phe ? +item.phe : 0,
            });
          });
          foodItems.value = temp;
        }
      });
    }

    return foodItems;
  };

  const itemProjectionFunction = (item: FoodItem) => {
    return item.name;
  };

  const selectItemEventHandler = (item: FoodItem) => {
    diet.value.foodUuid = item.uuid;
    diet.value.foodName = item.name;
  };

  const saveDiet = () => {
    addDietAction(diet.value).subscribe((res: HttpMessage<string>) => {
      if (res.code === "200") {
        Notify({ type: "success", message: "添加成功" });
        router.push("/main/density/displayDiet");
      } else {
        Notify({ type: "warning", message: "添加失败" });
      }
    });
  };

  const removeDiet = (dietId: string) => {
    deleteDietAction(dietId).subscribe((res: HttpMessage<string>) => {
      if (res.code === "200") {
        Notify({ type: "success", message: "移除成功" });
        router.push("/main/density/displayDiet");
      } else {
        Notify({ type: "warning", message: "移除失败" });
      }
    });
  };

  return {
    title,
    diet,
    dietTypeColumns,
    smilkTypeColumns,
    showDietTimePicker,
    showDietTypePicker,
    showSmilkTypePicker,
    foodItems,
    onClickLeft,
    onClickRight,
    setDietTime,
    setDietType,
    setSmilkType,
    saveDiet,
    removeDiet,
    onInputEventHandler,
    itemProjectionFunction,
    selectItemEventHandler,
  };
}
