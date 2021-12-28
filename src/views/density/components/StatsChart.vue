<template>
  <div v-show="!loading" class="bg-blue-50 rounded mt-1">
    <canvas v-if="data.length" ref="cLine" />
    <van-empty v-else class="custom-image" description="请添加血值记录" />
  </div>
  <van-loading v-show="loading" type="spinner" class="text-center" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from "@vue/runtime-core";
import F2 from "@antv/f2/lib/index-all";
import { getLatestDensityAction } from "@/action/density";
import { HttpMessage } from "@/types/index";
import { DensityList, ChartType, Density } from "@/types/density";

export default defineComponent({
  setup() {
    const cLine = ref<any>(null);
    const data = ref<ChartType[]>([]);
    const loading = ref<boolean>(false);

    onMounted(() => {
      loading.value = true;
      getLatestDensityAction(30).subscribe((res: HttpMessage<DensityList>) => {
        loading.value = false;
        if (res.code === "200") {
          const temp: ChartType[] = [];
          res.data.forEach((density: Density) => {
            temp.push({
              date: density.measureTime,
              value: density.measureValue,
            });
          });
          data.value = temp;
        }
      });
    });

    watch(
      () => data.value,
      () => {
        if (data.value.length > 0) {
          nextTick(() => {
            const chart = new F2.Chart({
              id: cLine.value,
              pixelRatio: window.devicePixelRatio,
            });

            chart.source(data.value, {
              value: {
                tickCount: 5,
                min: 0,
              },
              date: {
                type: "timeCat",
                range: [0, 1],
                tickCount: 3,
              },
            });
            chart.tooltip({
              custom: true,
              showXTip: true,
              showYTip: true,
              snap: true,
              crosshairsType: "xy",
              crosshairsStyle: {
                lineDash: [2],
              },
            });
            chart.axis("date", {
              label: function label(text, index, total) {
                const textCfg = {} as any;
                if (index === 0) {
                  textCfg.textAlign = "left";
                } else if (index === total - 1) {
                  textCfg.textAlign = "right";
                }
                return textCfg;
              },
            });
            // 绘制 Guide.Line
            chart.guide().line({
              start: ["min", 2],
              end: ["max", 2],
              style: {
                stroke: "#10B981",
                lineWidth: 1,
                lineCap: "round",
              },
            });
            chart.guide().line({
              start: ["min", 4],
              end: ["max", 4],
              style: {
                stroke: "#d0502d",
                lineWidth: 1,
                lineCap: "round",
              },
            });
            chart.line().position("date*value");
            chart.render();
          });
        }
      },
    );

    return {
      loading,
      cLine,
      data,
    };
  },
});
</script>

<style>
.custom-image {
  padding: 0;
}
</style>
