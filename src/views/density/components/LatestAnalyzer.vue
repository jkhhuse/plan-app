<template>
  <div class="mt-1 text-xs">
    <div class="bg-blue-50 h-18 rounded">
      <p class="mt-2 p-1">最近 {{ day }} 日摄入(平均值)</p>
      <div class="flex-auto flex-row flex p-1">
        <div class="w-1/3">
          <div class="flex flex-row">
            <img :src="specialMilk" />
            <div class="leading-9 ml-2" @click="pushToast('特奶平均量', stats.specialProtein + 'g')">
              {{ stats.specialProtein }} g
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <div class="flex flex-row">
            <img :src="milkBottle" />
            <div class="leading-9 ml-2" @click="pushToast('特奶摄入平均量', stats.specialProteinMl + 'ml')">
              {{ stats.specialProteinMl }} ml
            </div>
          </div>
        </div>
      </div>
      <div class="flex-auto flex-row flex p-1">
        <div class="w-1/3">
          <div class="flex flex-row">
            <img :src="egg" />
            <div class="leading-9 ml-2" @click="pushToast('天然蛋白质摄入平均量', stats.natureProtein + 'g')">
              {{ stats.natureProtein }} g
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <div class="flex flex-row">
            <div>
              <img :src="protein" />
            </div>
            <div class="leading-9 ml-2" @click="pushToast('摄入总蛋白质平均量', stats.totalProtein + 'g')">
              {{ stats.totalProtein }} g
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <div class="flex flex-row">
            <div>
              <img :src="phe" />
            </div>
            <div class="leading-9 ml-2" @click="pushToast('摄入苯丙氨酸平均量', stats.pheValue + 'mg')">
              {{ stats.pheValue }} mg
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Statisitcs } from "@/types/statistics";
import { defineComponent } from "@vue/runtime-core";
import { Toast } from "vant";
import specialMilk from "@/assets/icons/specialMilk.svg";
import milkBottle from "@/assets/icons/milkBottle.svg";
import egg from "@/assets/icons/egg.svg";
import protein from "@/assets/icons/protein.svg";
import phe from "@/assets/icons/phe.svg";

interface Props {
  day: number;
  stats: Statisitcs;
}

export default defineComponent({
  props: ["day", "stats"],
  setup(props: Props) {
    const pushToast = (text: string, content: string) => {
      Toast(text + ": " + content);
    };

    return {
      pushToast,
      specialMilk,
      milkBottle,
      egg,
      protein,
      phe,
    };
  },
});
</script>

<style></style>
