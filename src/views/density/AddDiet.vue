<template>
  <van-nav-bar
    :title="route.params.date + ' 饮食'"
    left-text="返回"
    right-text="回到首页"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  <van-field
    readonly
    clickable
    name="datetimePicker"
    v-model="densityTime"
    label="进食时间"
    placeholder="点击选择时间"
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" overlay="true" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      type="time"
      title="选择时间"
      @confirm="setDensityTime(currentDate)"
    />
  </van-popup>
  <van-field v-model="profile.origin" type="text" label="苯计算" />
  <van-field v-model="profile.origin" type="text" label="进食食物" />
  <div class="p-4">
    <van-button type="primary" block class="mt-2" @click="saveProfile">保存</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
// import { HttpMessage } from "@/types/index";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const showPicker = ref<boolean>(false);
    const densityTime = ref<string>("111");
    // const density = {
    //   densityTime
    // }

    const onClickLeft = () => {
      router.push("/main/profile");
    };

    const onClickRight = () => Toast("按钮");

    onMounted(() => {
      console.log();
    });

    const showPopup = () => {
      showPicker.value = true;
    };

    const setDensityTime = (currentDate: string) => {
      densityTime.value = currentDate;
    };

    return {
      areaList,
      showPicker,
      densityTime,
      onClickLeft,
      onClickRight,
      showPopup,
      setDensityTime,
    };
  },
});
</script>

<style></style>
