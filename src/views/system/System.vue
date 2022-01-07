<template>
  <van-nav-bar title="个人中心" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-home-o" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div class="flex flex-row justify-items-center place-content-center">
    <div><img class="h-20 w-20" :src="profile.pictureLink" @click="showPicture = true" /></div>
    <van-uploader v-model="fileList" multiple />
  </div>
  <van-overlay :show="showPicture" @click="showPicture = false">
    <div class="flex justify-center items-center" @click="showPicture = false">
      <img class="h-auto w-auto" :src="profile.pictureLink" @click="showPicture = true" />
    </div>
  </van-overlay>
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
import { defineComponent, onMounted, ref, watch } from "@vue/runtime-core";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import useProfile from "./hooks/useProfile";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { profile, fetchPictureLink } = useProfile();
    const fileList = ref<any>([]);
    const showPicture = ref<boolean>(false);

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

    watch(
      () => profile.value.pictureLink,
      () => {
        fileList.value = [
          {
            url: profile.value.pictureLink,
          },
        ];
      },
    );

    onMounted(() => {
      fetchPictureLink();
    });

    return {
      profile,
      showPicture,
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
