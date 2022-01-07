<template>
  <van-nav-bar title="食谱" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-home-o" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div>Cookbook</div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from "@vue/runtime-core";

export default defineComponent({
  name: "Cookbook",
  setup(props: any, context: SetupContext) {
    return {};
  },
});
</script>
