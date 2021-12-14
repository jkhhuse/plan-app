<template>
  <van-nav-bar
    :title="route.params.date + ' 饮食'"
    left-text="返回"
    right-text="回到首页"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  <van-field
    readonly
    clickable
    name="datetimePicker"
    v-model="diet.dietTime"
    label="进食时间"
    placeholder="点击选择时间"
    @click="showDietTimePicker = true"
  />
  <van-popup v-model:show="showDietTimePicker" overlay="true" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      type="time"
      title="选择时间"
      @cancle="showDietTimePicker = false"
      @confirm="setDietTime(currentDate)"
    />
  </van-popup>
  <van-field
    readonly
    clickable
    name="picker"
    label="食物种类"
    v-model="dietTypeColumns[diet.dietType]"
    placeholder="选择食物"
    @click="showDietTypePicker = true"
  />
  <van-popup v-model:show="showDietTypePicker" round position="bottom">
    <van-picker
      show-toolbar
      :columns="dietTypeColumns"
      @cancel="showDietTypePicker = false"
      @confirm="setDietType"
    />
  </van-popup>
  <van-field v-model="diet.pheValue" type="text" label="苯计算" />
  <van-field
    v-model="diet.dietContent"
    rows="3"
    autosize
    label="食物记录"
    type="textarea"
    placeholder="请输入食物"
  />
  <div class="p-4">
    <van-button type="primary" block class="mt-2" @click="saveDiet">保存</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import { Notify } from "vant";
import { useRoute, useRouter } from "vue-router";
import { Diet, DietType, DIET_TYPE_COLUMNS } from "@/types/diet";
import { combineTime } from "@/utils/tool";
import { addDietAction } from "@/action/diet";
import { HttpMessage } from "@/types";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showDietTimePicker = ref<boolean>(false);
    const showDietTypePicker = ref<boolean>(false);
    const diet = ref<Diet>({} as Diet);
    const dietTypeColumns = DIET_TYPE_COLUMNS;

    watch(
      () => route.params.date,
      () => {
        diet.value = {
          dietContent: "",
          dietTime: combineTime(route.params.date as string, "00:00"),
          dietType: DietType.SPECIAL_MILK,
          pheValue: 0,
        };
      },
      {
        immediate: true,
      },
    );

    const onClickLeft = () => {
      router.push("/main/density/displayDiet");
    };

    const onClickRight = () => () => {
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
      route,
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
  },
});
</script>

<style></style>
