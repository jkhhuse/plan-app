<template>
  <van-nav-bar
    :title="title"
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
      type="time"
      title="选择时间"
      @cancle="showDietTimePicker = false"
      @confirm="setDietTime"
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
  <van-field v-if="diet.dietType === 0" v-model="diet.specialMilk" type="number" label="特奶量(ml)" />
  <van-field v-if="diet.dietType === 1" v-model="diet.breastMilk" type="number" label="母乳量(ml)" />
  <van-field v-model="diet.pheValue" type="number" label="苯计算(mg)" />
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
import { defineComponent } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import useDiet from "./hooks/useDiet";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const {
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
    } = useDiet(route, router);

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
  },
});
</script>

<style></style>
