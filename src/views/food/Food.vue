<template>
  <van-nav-bar title="食物" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-home-o" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div>
    <van-search v-model="keyword" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
  </div>
  <div v-if="loading">
    <van-loading size="24px">加载中...</van-loading>
  </div>
  <div v-else class="p-2">
    <div v-if="foods.length > 0">
      <div v-for="food in foods" :key="food.uuid">
        <FoodUnit :food="food" class="m-2" />
      </div>
    </div>
    <div v-else>
      <van-empty image="search" description="暂未收录" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from "@vue/runtime-core";
import useFood from "./hooks/useFood";
import FoodUnit from "./FoodUnit.vue";

export default defineComponent({
  name: "Food",
  components: {
    FoodUnit,
  },
  setup(props: any, context: SetupContext) {
    const { foods, loading, keyword } = useFood();

    return {
      foods,
      loading,
      keyword,
    };
  },
});
</script>
