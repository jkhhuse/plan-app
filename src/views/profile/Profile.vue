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
    <van-field
      v-model="profile.bornTime"
      is-link
      readonly
      name="calendar"
      label="出生日期"
      placeholder="点击选择日期"
      @click="showBornTime = true"
    />
    <van-calendar v-model:show="showBornTime" @confirm="onBornTimeConfirm" color="rgb(110, 231, 183)" />
    <van-field v-model="profile.origin" type="number" label="初始血值" />
    <van-field v-model="profile.email" type="email" label="邮箱" />
    <van-field
      v-model="profile.addr"
      is-link
      readonly
      name="area"
      label="居住城市"
      placeholder="点击选择城市"
      @click="showAddr = true"
    />
    <van-popup v-model:show="showAddr" position="bottom">
      <van-area :area-list="areaList" @confirm="onAddrConfirm" @cancel="showAddr = false" />
    </van-popup>
    <van-field v-model="profile.passwd" type="password" label="确认密码" />
  </van-cell-group>

  <div class="p-4">
    <van-button type="primary" block class="mt-2" @click="saveProfile">保存</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { Toast } from "vant";
import { Profile } from "@/types/profile";
import { areaList } from "@vant/area-data";
import { HttpMessage, VantAreaType } from "@/types/index";
import * as crypto from "crypto-js";
import { getProfile } from "@/action/profile";

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
    const showAddr = ref<boolean>(false);

    const onBornTimeConfirm = (date: Date) => {
      showBornTime.value = false;
      profile.value.bornTime = `${date.getFullYear() + 1}/${date.getMonth() + 1}/${date.getDate()}`;
    };

    const onAddrConfirm = (values: VantAreaType[]) => {
      showAddr.value = false;
      profile.value.addr = values
        .filter((item: VantAreaType) => !!item)
        .map((item: VantAreaType) => item.name)
        .join("/");
    };

    const onClickLeft = () => Toast("返回");

    const onClickRight = () => Toast("按钮");

    const updateProfile = () => {
      crypto.DES.decrypt(profile.value.passwd, "plan app").toString();
    };

    onMounted(() => {
      getProfile().subscribe((res: HttpMessage<Profile>) => {
        profile.value = res.data;
        console.log(res.data);
      });
    });

    // const saveProfile = () => {
    // }

    return {
      profile,
      showBornTime,
      showAddr,
      areaList,
      onBornTimeConfirm,
      onAddrConfirm,
      onClickLeft,
      onClickRight,
      updateProfile,
      // saveProfile
    };
  },
});
</script>

<style></style>
