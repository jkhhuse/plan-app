<template>
  <van-nav-bar title="个人中心" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-nav" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Toast } from "vant";

export default defineComponent({
  setup() {
    const onClickLeft = () => Toast("返回");
    const onClickRight = () => Toast("按钮");
    return {
      onClickLeft,
      onClickRight,
    };
  },
});
</script>

<style></style>
