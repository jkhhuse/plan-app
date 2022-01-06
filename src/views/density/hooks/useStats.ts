import { onMounted } from "vue";
import { searchLatestDietAction } from "@/action/statistics";
import { HttpMessage } from "@/types";
import { Statisitcs } from "@/types/statistics";
import { watch, ref } from "@vue/runtime-core";
import { getLatestMeasureTimeAction } from "@/action/density";
import { getLatestWeightAction } from "@/action/corporeality";

export default function useStats(): any {
  const measureTime = ref<string>("");
  const weight = ref<number>(0); // 体重 kg
  const threeDayStats = ref<Statisitcs>({} as Statisitcs);
  const sevenDayStats = ref<Statisitcs>({} as Statisitcs);
  const suggestSpecialMilk = ref<number>(0); // 推荐特奶 g
  const suggestMilkName = ref<string>(""); // 当前服用特奶的名称
  const suggestMilkMilkMl = ref<number>(0); // 推荐特奶 ml

  // 获得最近一次的测量时间
  const getLatestMeasureTime = () => {
    getLatestMeasureTimeAction().subscribe((res: HttpMessage<string>) => {
      if (res.code === "200") {
        measureTime.value = res.data;
      }
    });
  };

  // TODO: 获得最近一次的体重指标信息
  const getLatestWeight = () => {
    getLatestWeightAction().subscribe((res: HttpMessage<number>) => {
      if (res.code === "200") {
        weight.value = res.data;
      }
    });
  };

  // 获得最近一次测量时间计算的最近 3 天、7天饮食情况
  const getLatestDiet = (days: number) => {
    searchLatestDietAction(measureTime.value, days.toString()).subscribe((res: HttpMessage<Statisitcs>) => {
      if (res.code === "200") {
        days === 3 ? (threeDayStats.value = res.data) : (sevenDayStats.value = res.data);
      }
    });
  };

  watch(
    () => measureTime.value,
    () => {
      if (measureTime.value) {
        // 饮食计算
        getLatestDiet(3);
        getLatestDiet(7);
        getLatestWeight();
      }
    },
  );

  watch([() => measureTime.value, () => weight.value], () => {
    console.log(measureTime.value + weight.value);
  });

  onMounted(() => {
    getLatestMeasureTime();
  });

  return {
    measureTime,
    weight,
    threeDayStats,
    sevenDayStats,
    suggestSpecialMilk,
    suggestMilkName,
    suggestMilkMilkMl,
  };
}
