<template>
  <van-nav-bar
    title="喂养记录"
    left-text="返回"
    right-text="添加记录"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  <van-calendar
    title="选择记录日期"
    :poppable="false"
    :show-confirm="false"
    :min-date="new Date(1990, 0, 1)"
    @select="onSelectDate"
    :style="{ height: '310px' }"
    color="rgb(110, 231, 183)"
  />
  <div class="text-xs text-left pt-2 pb-2 pl-2 bg-gray-100 mt-2 mb-2 text-gray-600 tracking-wide leading-5">
    <div>当日苯摄入量: {{ pheValueTotal }} mg</div>
    <div v-if="breastMilkTotal">当日总母乳量: {{ breastMilkTotal }} ml</div>
    <div>当日特奶量: {{ specialMilkTotal }} ml</div>
  </div>
  <van-steps direction="vertical" :active="0">
    <van-step v-for="item in dietList" :key="item.uuid" @click="clickStep(item)" class="hover:text-green-500">
      <h3>{{ item.dietTime }}</h3>
      <p v-if="item.dietType === 0">
        {{ DIET_TYPE_COLUMNS[item.dietType] }} 摄入量: {{ item.specialMilk }} ml
      </p>
      <p v-else-if="item.dietType === 1">
        {{ DIET_TYPE_COLUMNS[item.dietType] }} 摄入量: {{ item.breastMilk }} ml
      </p>
      <p v-else>{{ DIET_TYPE_COLUMNS[item.dietType] }}</p>
      <p>苯 摄入量: {{ item.pheValue }}</p>
    </van-step>
  </van-steps>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import { Diet } from "@/types/diet";
import { HttpMessage } from "@/types/index";
import { useRouter } from "vue-router";
import { formatDate, formatExcludeMinute } from "@/utils/tool";
import { findDietByDateAction } from "@/action/diet";
import { DIET_TYPE_COLUMNS } from "@/types/diet";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const router = useRouter();
    const selectedTime = ref<string>(formatDate(new Date()));
    const dietList = ref<Diet[]>([]);
    const specialMilkTotal = ref<number>(0);
    const breastMilkTotal = ref<number>(0);
    const pheValueTotal = ref<number>(0);

    const computeTotalData = (dietList: Diet[]): void => {
      specialMilkTotal.value = 0;
      breastMilkTotal.value = 0;
      pheValueTotal.value = 0;
      dietList.map((diet: Diet) => {
        if (diet.specialMilk) {
          specialMilkTotal.value = specialMilkTotal.value + diet.specialMilk;
        }
        if (diet.breastMilk) {
          breastMilkTotal.value = breastMilkTotal.value + diet.breastMilk;
        }
        pheValueTotal.value = pheValueTotal.value + diet.pheValue;
      });
    };

    const refreshDietList = (dateTime: string) => {
      findDietByDateAction(dateTime).subscribe((res: HttpMessage<Diet[]>) => {
        if (res.code === "200") {
          computeTotalData(res.data);
          dietList.value = res.data.sort((a: Diet, b: Diet) => {
            return dayjs(b.dietTime).unix() - dayjs(a.dietTime).unix();
          });
        }
      });
    };

    const onSelectDate = (date: Date) => {
      selectedTime.value = formatDate(date);
    };

    watch(
      () => selectedTime.value,
      () => {
        // 更新 list 数据
        refreshDietList(selectedTime.value);
      },
      {
        immediate: true,
      },
    );

    const clickStep = (diet: Diet) => {
      const time = formatExcludeMinute(diet.dietTime);
      router.push(`/main/density/editDiet/${diet.uuid}/${time}`);
    };

    const onClickLeft = () => {
      router.push("/main/density");
    };

    const onClickRight = () => {
      router.push(`/main/density/addDiet/${selectedTime.value}`);
    };

    return {
      selectedTime,
      dietList,
      DIET_TYPE_COLUMNS,
      specialMilkTotal,
      breastMilkTotal,
      pheValueTotal,
      onClickLeft,
      onClickRight,
      onSelectDate,
      clickStep,
    };
  },
});
</script>

<style></style>
