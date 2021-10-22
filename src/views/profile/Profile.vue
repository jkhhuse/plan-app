<template>
  <van-nav-bar title="个人中心" left-text="返回" left-arrow>
    <template #left>
      <van-icon name="wap-nav" size="18" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div class="w-32 p-4">
    <img src="@/assets/logo.png" class="w-full object-fill object-center object-scale-down green" />
  </div>
  <van-cell-group inset>
    <van-field v-model="profile.name" label="用户昵称" />
    <van-cell title="选择单个日期" :value="profile.bornTime" @click="showBornTime = true" />
    <van-calendar v-model:show="showBornTime" @confirm="onBornTimeConfirm" color="rgb(110, 231, 183)" />
    <!-- <van-calendar v-model:show="showBornTime" @confirm="onConfirm" /> -->
    <!-- <van-field v-model="profile.bornTime" type="tel" label="手机号" /> -->
    <van-field v-model="profile.origin" type="number" label="整数" />
  </van-cell-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { Toast } from "vant";
import { Profile } from "@/types/profile";

export default defineComponent({
  setup() {
    const profile = ref<Profile>({
      name: "",
      bornTime: "",
      origin: 0,
      createTime: "",
      addr: "",
      email: "",
      passwd: "",
    });

    const showBornTime = ref<boolean>(false);

    const onBornTimeConfirm = (date: Date) => {
      showBornTime.value = false;
      profile.value.bornTime = `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const onClickLeft = () => Toast("返回");

    const onClickRight = () => Toast("按钮");

    return {
      profile,
      showBornTime,
      onBornTimeConfirm,
      onClickLeft,
      onClickRight,
    };
  },
});
</script>

<style></style>
