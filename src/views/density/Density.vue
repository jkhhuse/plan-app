<template>
  <div class="flex flex-row justify-between mt-2 mr-2 ml-2">
    <div class="text-left">
      <div class="text-sm">你好, xxx</div>
      <div class="text-base mt-4 tracking-wide text-dark-title font-semibold">健康管理档案</div>
    </div>
    <div>头像</div>
  </div>
  <div class="text-right mr-2">
    <van-button
      @click="addDensity"
      icon="plus"
      type="default"
      size="mini"
      class="p-2 border-green-500 text-green-500"
    >
      增加喂养记录
    </van-button>
    <van-button
      @click="addDensity"
      icon="plus"
      type="default"
      size="mini"
      class="p-2 border-green-500 text-green-500"
    >
      增加生长记录
    </van-button>
  </div>
  <div class="text-left m-2 mt-4 bg-white p-2 rounded-md">
    <div class="text-sm">血值情况监测</div>
    <StatsChart />
  </div>
  <div class="text-left m-2 mt-4 bg-white p-2 rounded-md">
    <div class="text-sm">血值控制比例</div>
    <ScaleChart />
  </div>
  <div class="text-left m-2 mt-4 bg-white p-2 rounded-md">
    <div class="text-sm">最近5次测量血值分析</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import StatsChart from "./components/StatsChart.vue";
import ScaleChart from "./components/ScaleChart.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    StatsChart,
    ScaleChart,
  },
  setup() {
    const router = useRouter();

    const addDensity = () => {
      router.push("/main/density/addDensity");
    };

    return {
      addDensity,
    };
  },
});
</script>

<style></style>
