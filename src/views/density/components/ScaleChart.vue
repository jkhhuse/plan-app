<template>
  <div v-if="!loading">
    <canvas v-if="!isNullData" ref="container" />
    <van-empty v-else class="custom-image" description="请添加血值记录" />
  </div>
  <van-loading v-else type="spinner" class="text-center" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "@vue/runtime-core";
import F2 from "@antv/f2/lib/index-all";
import { HttpMessage } from "@/types";
import { PieType, PieTypeRender } from "@/types/density";
import { getScaleDensityAction } from "@/action/density";

export default defineComponent({
  setup() {
    const container = ref<any>(null);
    const data = ref<PieTypeRender[]>([]);
    const isNullData = ref<boolean>(false);
    const loading = ref<boolean>(false);

    onMounted(() => {
      loading.value = true;
      getScaleDensityAction().subscribe((res: HttpMessage<PieType[]>) => {
        loading.value = false;
        if (res.code === "200") {
          const temp: PieTypeRender[] = [];
          res.data.forEach((pieType: PieType) => {
            temp.push({
              ...pieType,
              const: "const",
            });
          });
          data.value = temp;
        }
      });
    });

    const nullValueCheck = (dataValue: PieTypeRender[]) => {
      let count = 0;
      dataValue.forEach(item => {
        item.value === 0 ? count++ : "";
      });
      isNullData.value = count === dataValue.length ? true : false;
    };

    watch(
      () => data.value,
      () => {
        nullValueCheck(data.value);
        if (!isNullData.value) {
          const chart = new F2.Chart({
            id: container.value,
            height: 200,
            pixelRatio: window.devicePixelRatio,
          });

          chart.source(data.value);
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
            .position("const*value")
            .color("name", ["#3B82F6", "#10B981", "#6366F1", "#F59E0B", "#DC2626"])
            .adjust("stack");
          chart.render();
        }
      },
    );

    return {
      container,
      data,
      isNullData,
      loading,
    };
  },
});
</script>

<style>
.custom-image {
  padding: 0;
}
</style>
