<template>血值</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { Toast } from "vant";
import { Profile } from "@/types/profile";
import { areaList } from "@vant/area-data";
import { HttpMessage, VantAreaType } from "@/types/index";
import * as crypto from "crypto-js";
import { getProfile } from "@/action/profile/profile";

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
