<template>
  <canvas ref="cLine" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "@vue/runtime-core";
import F2 from "@antv/f2/lib/index-all";
import { getLatestDensityAction } from "@/action/density";
import { HttpMessage } from "@/types/index";
import { DensityList, ChartType, Density } from "@/types/density";

export default defineComponent({
  setup() {
    const cLine = ref<any>(null);
    const data = ref<ChartType[]>([]);

    onMounted(() => {
      getLatestDensityAction().subscribe((res: HttpMessage<DensityList>) => {
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
        chart.line().position("date*value");
        chart.render();
      },
    );

    return {
      cLine,
    };
  },
});
</script>

<style></style>
