<template>
  <van-nav-bar
    title="血值记录"
    left-text="返回"
    right-text="添加记录"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  这里是一个列表
  <van-list v-model="loading" :finished="loadFinished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in densityList" :key="item" :title="item" />
  </van-list>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import useDensity from "./hooks/useDensity";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { densityList, loadFinished, finishedText, loading, onLoad } = useDensity();

    const onClickLeft = () => {
      router.push("/main/density");
    };

    const onClickRight = () => {
      router.push("/main/density/addDensity");
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
    };
  },
});
</script>

<style></style>
