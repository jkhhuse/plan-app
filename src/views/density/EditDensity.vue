<template>
  <van-nav-bar
    title="更新血值记录"
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
    <van-calendar v-model:show="showPicker" @confirm="setDensityTime" color="rgb(110, 231, 183)" />
    <van-field v-model="density.measureValue" type="text" label="血值" />
    <div class="p-4">
      <van-button type="primary" block class="mt-2" @click="saveDensity">保存</van-button>
    </div>
  </van-cell-group>
</template>

<script lang="ts">
import { Density } from "@/types/density";
import { defineComponent, ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { formatDate } from "@/utils/tool";
import { updateDensityAction } from "@/action/density";
import { HttpMessage } from "@/types";
import { Notify } from "vant";

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

    watch(
      () => route.params.uuid,
      () => {
        density.value = {
          uuid: route.params.uuid as string,
          measureTime: route.params.measureTime as string,
          measureValue: +route.params.measureValue,
        };
      },
      {
        immediate: true,
      },
    );

    const setDensityTime = (currentDate: any) => {
      density.value.measureTime = `${currentDate.getFullYear() + 1}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
      showPicker.value = false;
    };

    const saveDensity = () => {
      updateDensityAction(
        density.value.uuid as string,
        density.value.measureTime,
        +density.value.measureValue,
      ).subscribe((res: HttpMessage<string>) => {
        if (res.code === "200") {
          Notify({ type: "success", message: "更新成功" });
          jumpToDisplayDensityPage();
        } else {
          Notify({ type: "warning", message: "更新失败" });
        }
      });
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
