<template>
  <div class="flex flex-row justify-between mt-2 mr-2 ml-2">
    <div class="text-left">
      <div class="text-sm">你好, xxx</div>
      <div class="text-base mt-4 tracking-wide text-dark-title font-semibold">健康管理档案</div>
    </div>
    <div>头像</div>
  </div>
  <div class="text-right mr-2">
    <van-button icon="plus" type="default" size="mini" class="p-2 border-green-500 text-green-500">
      添加记录
    </van-button>
  </div>
  <div class="text-left m-2 mt-4 flex flex-row justify-between">
    <div class="bg-white h-32 w-1/3 mr-2">
      <div class="mobile-container">
        <div class="mobile-header"></div>
        <div class="mobile-content">
          <canvas ref="container" />
        </div>
      </div>
    </div>
    <div class="bg-white h-32 flex-grow">
      <div>标题</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import F2 from "@antv/f2";

export default defineComponent({
  setup() {
    // const ctx = ref<any>(null);const $axios = inject('$axios');

    // const ctx = document.getElementById("myChart") as any;

    // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。

    const container = ref<any>(null);

    onMounted(() => {
      const data = [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ];
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: container.value,
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      });

      // Step 2: 载入数据源
      chart.source(data);

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position("genre*sold").color("genre");

      // Step 4: 渲染图表
      chart.render();
    });

    return {
      container,
    };
  },
});
</script>

<style></style>
