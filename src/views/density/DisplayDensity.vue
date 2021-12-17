<template>
  <van-nav-bar
    title="血值记录"
    left-text="返回"
    right-text="添加记录"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white p-2">
    <van-list
      v-if="densityList.length > 0"
      v-model="loading"
      :finished="loadFinished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="item in densityList" :key="item.measureTime">
        <van-cell :title="item.measureTime" :title-style="'text-align: left;'" :value="item.measureValue" />
        <template #right>
          <van-button square @click="updateDensity(item)" type="primary" text="编辑" />
          <van-button square @click="removeDensity(item)" type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-list>
    <van-empty v-else description="请添加血值记录" />
  </div>
</template>

<script lang="ts">
import { removeDensityAction } from "@/action/density";
import { HttpMessage } from "@/types";
import { Density } from "@/types/density";
import { defineComponent } from "@vue/runtime-core";
import { Notify } from "vant";
import { useRouter } from "vue-router";
import useDensity from "./hooks/useDensity";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { densityList, loadFinished, finishedText, loading, onLoad, fetchDensityList } = useDensity();

    const onClickLeft = () => {
      router.push("/main/density");
    };

    const onClickRight = () => {
      router.push("/main/density/addDensity");
    };

    const updateDensity = (density: Density) => {
      router.push(
        `/main/density/updateDensity/${density.uuid}/${density.measureTime}/${density.measureValue}`,
      );
    };

    const removeDensity = (density: Density) => {
      removeDensityAction(density.uuid as string).subscribe((res: HttpMessage<string>) => {
        if (res.code === "200") {
          // 删除完刷新列表
          fetchDensityList(1, 20);
          Notify({ type: "success", message: "删除成功" });
        } else {
          Notify({ type: "warning", message: "删除失败" });
        }
      });
    };

    return {
      router,
      densityList,
      loadFinished,
      finishedText,
      loading,
      onLoad,
      onClickLeft,
      onClickRight,
      updateDensity,
      removeDensity,
    };
  },
});
</script>

<style></style>
