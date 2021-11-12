<template>
  <canvas ref="container" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import F2 from "@antv/f2/lib/index-all";

export default defineComponent({
  setup() {
    const container = ref<any>(null);

    onMounted(() => {
      const data = [
        {
          name: "其他消费",
          y: 6371664,
          const: "const",
        },
        {
          name: "生活用品",
          y: 7216301,
          const: "const",
        },
        {
          name: "通讯物流",
          y: 1500621,
          const: "const",
        },
        {
          name: "交通出行",
          y: 586622,
          const: "const",
        },
        {
          name: "饮食",
          y: 900000,
          const: "const",
        },
      ];

      const chart = new F2.Chart({
        id: container.value,
        height: 200,
        pixelRatio: window.devicePixelRatio,
      });

      chart.source(data);
      chart.coord("polar", {
        transposed: true,
        radius: 0.75,
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      // 添加饼图文本
      chart.pieLabel({
        sidePadding: 10,
        lineHeight: 16,
        label1: function label1(data, color) {
          return {
            text: data.name,
            fill: color,
          };
        },
      });

      chart
        .interval()
        .position("const*y")
        .color("name", ["#1890FF", "#13C2C2", "#2FC25B", "#FACC14", "#F04864"])
        .adjust("stack");
      chart.render();
    });

    return {
      container,
    };
  },
});
</script>

<style></style>
