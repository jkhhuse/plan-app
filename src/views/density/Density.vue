<template>
  <div class="flex flex-row justify-between mt-2 mr-2 ml-2">
    <div class="text-left">
      <div class="text-sm">你好, xxx</div>
      <div class="text-base mt-4 tracking-wide text-dark-title font-semibold">健康管理档案</div>
    </div>
    <div>头像</div>
  </div>
  <div class="text-right mr-2">
    <van-button icon="plus" type="default" size="mini" class="p-2 border-green-500 text-green-500">
      添加记录
    </van-button>
  </div>
  <div class="text-left m-2 mt-4 flex flex-row justify-between">
    <div class="bg-white h-32 w-1/3 mr-2">
      <div>标题</div>
    </div>
    <div class="bg-white h-32 flex-grow">
      <div>标题</div>
    </div>
  </div>
</template>

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
