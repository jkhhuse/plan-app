<template>
  <van-nav-bar
    title="添加血值记录"
    left-text="返回"
    right-text="回到首页"
    left-arrow
    @click-left="jumpToDisplayDensityPage"
    @click-right="jumpToDensityPage"
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
    <van-calendar
      v-model:show="showPicker"
      :min-date="new Date(1990, 0, 1)"
      @confirm="setDensityTime"
      color="rgb(110, 231, 183)"
    />
    <van-field v-model="density.measureValue" type="text" label="血值" />
    <div class="p-4">
      <van-button type="primary" block class="mt-2" @click="saveDensity">保存</van-button>
    </div>
  </van-cell-group>
</template>

<script lang="ts">
import { Density } from "@/types/density";
import { defineComponent, ref } from "@vue/runtime-core";
// import { HttpMessage } from "@/types/index";
import { useRoute, useRouter } from "vue-router";
import { formatDate } from "@/utils/tool";
import { addDensityAction } from "@/action/density";
import { HttpMessage } from "@/types";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showPicker = ref<boolean>(false);
    const density = ref<Density>({
      measureTime: formatDate(new Date()),
      measureValue: 0,
    });

    const jumpToDisplayDensityPage = () => {
      router.push("/main/density/displayDensity");
    };

    const jumpToDensityPage = () => {
      router.push("/main/density");
    };

    const setDensityTime = (currentDate: any) => {
      density.value.measureTime = `${currentDate.getFullYear() + 1}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
      showPicker.value = false;
    };

    const saveDensity = () => {
      addDensityAction(density.value.measureTime, density.value.measureValue).subscribe(
        (res: HttpMessage<string>) => {
          if (res.code === "200") {
            jumpToDisplayDensityPage();
          }
        },
      );
    };

    return {
      showPicker,
      density,
      route,
      jumpToDisplayDensityPage,
      jumpToDensityPage,
      setDensityTime,
      saveDensity,
    };
  },
});
</script>

<style></style>
