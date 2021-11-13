<template>
  <canvas ref="cLine" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import F2 from "@antv/f2/lib/index-all";

export default defineComponent({
  setup() {
    const cLine = ref<any>(null);

    onMounted(() => {
      const data = [
        {
          date: "2017-06-05",
          value: 3.4,
        },
        {
          date: "2017-07-06",
          value: 31,
        },
        {
          date: "2017-08-07",
          value: 3.5,
        },
        {
          date: "2017-08-08",
          value: 0.5,
        },
        {
          date: "2017-09-01",
          value: 1.3,
        },
      ];

      const chart = new F2.Chart({
        id: cLine.value,
        pixelRatio: window.devicePixelRatio,
      });

      chart.source(data, {
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
    });

    return {
      cLine,
    };
  },
});
</script>

<style></style>
