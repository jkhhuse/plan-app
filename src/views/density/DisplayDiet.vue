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
  <div class="text-sm text-left pt-2 pb-2 pl-2 bg-white mt-2 mb-2">
    <div>当日苯摄入量: xxx 单位</div>
    <div>当日特奶量: xxx ml</div>
  </div>
  <van-steps direction="vertical" :active="0">
    <van-step v-for="item in dietList" :key="item.uuid" @click="clickStep(item)">
      <h3>{{ item.dietTime }}</h3>
      <p>{{ DIET_TYPE_COLUMNS[item.dietType] }} 摄入苯量: {{ item.pheValue }}</p>
      <p>2016-07-12 12:40 摄入苯量: {{ item.dietContent }}</p>
    </van-step>
  </van-steps>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import { Diet } from "@/types/diet";
import { HttpMessage } from "@/types/index";
import { useRouter } from "vue-router";
import { formatDate } from "@/utils/tool";
import { findDietByDateAction } from "@/action/diet";
import { DIET_TYPE_COLUMNS } from "@/types/diet";

export default defineComponent({
  setup() {
    const router = useRouter();
    const selectedTime = ref<string>(formatDate(new Date()));
    const dietList = ref<Diet[]>([]);

    const refreshDietList = (dateTime: string) => {
      findDietByDateAction(dateTime).subscribe((res: HttpMessage<Diet[]>) => {
        if (res.code === "200") {
          dietList.value = res.data;
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
      router.push(`/main/density/editDiet/${diet.uuid}/${diet.dietTime}`);
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
      onClickLeft,
      onClickRight,
      onSelectDate,
      clickStep,
    };
  },
});
</script>

<style></style>
