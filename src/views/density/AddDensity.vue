<template>
  <van-nav-bar
    title="添加血值记录"
    left-text="返回"
    right-text="回到首页"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  <van-cell-group class="bg-white pt-4">
    <van-field
      v-model="density.measureTime"
      is-link
      readonly
      name="calendar"
      label="采血时间"
      placeholder="点击选择日期"
      @click="showPicker = true"
    />
    <van-calendar v-model:show="showPicker" @confirm="setDensityTime" color="rgb(110, 231, 183)" />
    <van-field v-model="density.measureValue" type="text" label="血值" />
    <div class="p-4">
      <van-button type="primary" block class="mt-2" @click="saveDensity">保存</van-button>
    </div>
  </van-cell-group>
</template>

<script lang="ts">
import { Density } from "@/types/density";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
// import { HttpMessage } from "@/types/index";
import { useRoute, useRouter } from "vue-router";
import { formatDate } from "@/utils/tool";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showPicker = ref<boolean>(false);
    const density = ref<Density>({
      measureTime: formatDate(new Date()),
      measureValue: 0,
    });

    const onClickLeft = () => {
      router.push("/main/density/displayDensity");
    };

    const onClickRight = () => {
      router.push("/main/density");
    };

    onMounted(() => {
      console.log();
    });

    const setDensityTime = (currentDate: any) => {
      density.value.measureTime = `
        ${currentDate.getFullYear() + 1}-
        ${currentDate.getMonth() + 1}-
        ${currentDate.getDate()}
      `;
      showPicker.value = false;
    };

    const saveDensity = () => {
      console.log();
    };

    return {
      showPicker,
      density,
      route,
      onClickLeft,
      onClickRight,
      setDensityTime,
      saveDensity,
    };
  },
});
</script>

<style></style>
