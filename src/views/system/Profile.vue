<template>
  <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft">
    <template #right>
      <van-icon name="bell" size="18" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div class="w-32 p-4">
    <!-- <img src="@/assets/logo.png" class="w-full object-fill object-center object-scale-down green" /> -->
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
import { getProfileAction } from "@/action/profile";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
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

    const onClickLeft = () => {
      router.push("/main/system");
    };

    const onClickRight = () => Toast("这是一个通知");

    const updateProfile = () => {
      crypto.DES.decrypt(profile.value.passwd, "plan app").toString();
    };

    onMounted(() => {
      getProfileAction().subscribe((res: HttpMessage<Profile>) => {
        profile.value = res.data;
      });
    });

    const saveProfile = () => {
      console.log();
    };

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
      saveProfile,
    };
  },
});
</script>

<style></style>
