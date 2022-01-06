<template>
  <div class="mt-2 text-xs">
    <div class="bg-blue-50 h-18 rounded">
      <p class="mt-2 p-1">分析参考</p>
      <div class="flex-auto flex-row flex p-1">
        <div class="flex flex-row">
          <img :src="balance" />
          <div class="leading-9 ml-6" @click="pushToast('天然蛋白质/特殊蛋白质', '推荐值 2:8')">比例 2:8</div>
        </div>
      </div>
      <div class="flex-auto flex-row flex p-1">
        <div class="flex flex-row">
          <img :src="suggest" />
          <div class="leading-9 ml-6" @click="pushToast('蛋白质摄入是否足够', '依据儿童蛋白质摄入量推荐值')">
            推荐量 13 g
          </div>
        </div>
      </div>
      <div class="flex-auto flex-row flex p-1">
        <div class="flex flex-row">
          <img :src="calculate" />
          <div
            class="leading-9 ml-6"
            @click="pushToast('耐受量推算', '依据最近4次血值与摄入苯量通过公式算出')"
          >
            耐受量 100 mg
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Toast } from "vant";
import suggest from "@/assets/icons/suggest.svg";
import calculate from "@/assets/icons/calculate.svg";
import balance from "@/assets/icons/balance.svg";

export default defineComponent({
  props: {
    day: Number,
  },
  setup() {
    const pushToast = (text: string, content: string) => {
      Toast(text + ": " + content);
    };

    return {
      pushToast,
      balance,
      suggest,
      calculate,
    };
  },
});
</script>

<style></style>
