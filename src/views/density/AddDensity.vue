<template>
  <van-nav-bar
    title="指标记录"
    left-text="返回"
    right-text="添加"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  <van-calendar
    title=""
    :poppable="false"
    :show-confirm="false"
    :style="{ height: '310px' }"
    color="rgb(110, 231, 183)"
  />
  <div class="mt-2">
    <div>苯摄入量</div>
    <div>特奶量</div>
  </div>
  <van-steps direction="vertical" @click-step="clickStep" :active="0">
    <van-step>
      <h3>【城市】物流状态1</h3>
      <p>2016-07-12 12:40</p>
    </van-step>
    <van-step>
      <h3>【城市】物流状态2</h3>
      <p>2016-07-11 10:00</p>
    </van-step>
    <van-step>
      <h3>快件已发货</h3>
      <p>2016-07-10 09:30</p>
    </van-step>
  </van-steps>
  <van-cell-group inset class="mt-5">
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
import { getProfile } from "@/action/profile/profile";
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
      router.push("/main/profile");
    };

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

    const clickStep = () => {
      alert();
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
      clickStep,
    };
  },
});
</script>

<style></style>
