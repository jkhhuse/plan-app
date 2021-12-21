<template>
  <van-nav-bar title="食物" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-nav" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div>
    <van-search v-model="value" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from "@vue/runtime-core";

export default defineComponent({
  name: "Food",
  setup(props: any, context: SetupContext) {
    return {};
  },
});
</script>
