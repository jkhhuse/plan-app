<template>
  <div
    v-if="food.rule === 'red'"
    class="border-red-200 bg-red-200 bg-opacity-30 rounded-md border-solid border p-2"
  >
    <p class="text-xs text-left font-bold">
      {{ food.name }} ({{ food.type === "accurate" ? "精确值" : "蛋白质换算值" }})
    </p>
    <div class="text-xs text-left font-thin">蛋白质含量(100g): {{ food.protein }}</div>
    <div class="text-xs text-left font-thin">苯丙氨酸含量(100g): {{ food.phe }}</div>
  </div>
  <div
    v-else-if="food.rule === 'yellow'"
    class="border-yellow-200 bg-yellow-200 bg-opacity-30 rounded-md border-solid border p-2"
  >
    <p class="text-xs text-left font-bold">
      {{ food.name }} ({{ food.type === "accurate" ? "精确值" : "估算值" }})
    </p>
    <div class="text-xs text-left font-thin">蛋白质含量(100g): {{ food.protein }}</div>
    <div class="text-xs text-left font-thin">苯丙氨酸含量(100g): {{ food.phe }}</div>
  </div>
  <div
    v-else-if="food.rule === 'green'"
    class="border-green-200 bg-green-200 bg-opacity-30 rounded-md border-solid border p-2"
  >
    <p class="text-xs text-left font-bold">
      {{ food.name }} ({{ food.type === "accurate" ? "精确值" : "估算值" }})
    </p>
    <div class="text-xs text-left font-thin">蛋白质含量(100g): {{ food.protein }}</div>
    <div class="text-xs text-left font-thin">苯丙氨酸含量(100g): {{ food.phe }}</div>
  </div>
</template>
<script lang="ts">
import { Food } from "@/types/food";
import { defineComponent, SetupContext } from "@vue/runtime-core";

interface Props {
  food: Food;
}

export default defineComponent({
  name: "FoodUnit",
  props: ["food"],
  setup(props: Props, context: SetupContext) {
    return {};
  },
});
</script>
