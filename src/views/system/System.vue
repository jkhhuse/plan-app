<template>
  <van-nav-bar title="个人中心" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-home-o" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div>头像</div>
  <van-cell
    title="用户信息"
    size="large"
    icon="user-circle-o"
    @click="jumpTo('profile')"
    is-link
    value="查看个人信息"
  />
  <van-cell title="指南" size="large" icon="video-o" is-link value="指导资料" />
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Toast } from "vant";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const onClickLeft = () => {
      console.log();
    };

    const onClickRight = () => {
      Toast("这是一个通知");
    };

    const jumpTo = (path: string) => {
      switch (path) {
        case "profile":
          router.push("/main/system/profile");
          break;
      }
    };

    return {
      onClickLeft,
      onClickRight,
      jumpTo,
    };
  },
});
</script>
<style scoped lang="less">
/deep/ .van-cell__title {
  text-align: left;
}
</style>
