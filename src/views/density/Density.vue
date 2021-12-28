<template>
  <div class="flex flex-row justify-between mt-2 mr-2 ml-2">
    <div class="text-left">
      <div class="text-sm">你好, {{ profile.name }}</div>
      <div class="text-base mt-4 tracking-wide text-dark-main font-semibold">健康管理档案</div>
    </div>
    <div>头像</div>
  </div>
  <div class="text-right mr-2">
    <van-button
      @click="displayDiet"
      icon="plus"
      type="default"
      size="mini"
      class="p-2 border-green-500 text-green-500"
    >
      查看喂养
    </van-button>
    <van-button
      @click="displayDensity"
      icon="plus"
      type="default"
      size="mini"
      class="p-2 border-green-500 text-green-500"
    >
      查看血值
    </van-button>
  </div>
  <div class="text-left m-1 mt-4 bg-white pl-1 pr-1 rounded-md">
    <div class="text-sm">血值情况监测(30次)</div>
    <StatsChart />
  </div>
  <div class="text-left m-1 mt-4 bg-white pl-1 pr-1 rounded-md">
    <div class="text-sm">血值控制比例(全部)</div>
    <ScaleChart />
  </div>
  <div class="text-left mt-4 ml-1 bg-white pl-1 pr-1 rounded-md">
    <div class="text-sm">最近1次血值结果分析</div>
    <LatestAnalyzer :day="3" />
    <LatestAnalyzer :day="7" />
    <Suggest />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import StatsChart from "./components/StatsChart.vue";
import ScaleChart from "./components/ScaleChart.vue";
import LatestAnalyzer from "./components/LatestAnalyzer.vue";
import Suggest from "./components/Suggest.vue";
import { useRouter } from "vue-router";
import useProfile from "@/views/profile/hooks/useProfile";

export default defineComponent({
  components: {
    StatsChart,
    ScaleChart,
    LatestAnalyzer,
    Suggest,
  },
  setup() {
    const router = useRouter();

    const { profile } = useProfile();

    const displayDensity = () => {
      router.push("/main/density/displayDensity");
    };

    const displayDiet = () => {
      router.push("/main/density/displayDiet");
    };

    return {
      profile,
      displayDensity,
      displayDiet,
    };
  },
});
</script>

<style></style>
