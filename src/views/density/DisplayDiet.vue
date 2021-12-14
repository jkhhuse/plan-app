<template>
  <van-nav-bar
    title="喂养记录"
    left-text="返回"
    right-text="添加记录"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div class="bg-white"></div>
  <van-calendar
    title="选择记录日期"
    :poppable="false"
    :show-confirm="false"
    @select="onSelectDate"
    :style="{ height: '310px' }"
    color="rgb(110, 231, 183)"
  />
  <div class="text-sm text-left pt-2 pb-2 pl-2 bg-white mt-2 mb-2">
    <div>当日苯摄入量: xxx 单位</div>
    <div>当日特奶量: xxx ml</div>
  </div>
  <van-steps direction="vertical" @click-step="clickStep" :active="0">
    <van-step>
      <h3>摄入苯量: 400</h3>
      <p>2016-07-12 12:40</p>
    </van-step>
    <van-step>
      <h3>摄入苯量: 400</h3>
      <p>2016-07-11 10:00</p>
    </van-step>
    <van-step>
      <h3>摄入苯量: 400</h3>
      <p>2016-07-10 09:30</p>
    </van-step>
  </van-steps>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { Profile } from "@/types/profile";
import { HttpMessage } from "@/types/index";
import { getProfile } from "@/action/profile";
import { useRouter } from "vue-router";
import { formatDate } from "@/utils/tool";

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
    const selectedTime = ref<string>(formatDate(new Date()));

    const onSelectDate = (date: Date) => {
      selectedTime.value = formatDate(date);
    };

    const onClickLeft = () => {
      router.push("/main/density");
    };

    const onClickRight = () => {
      router.push(`/main/density/addDiet/${selectedTime.value}`);
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
      selectedTime,
      onClickLeft,
      onClickRight,
      onSelectDate,
      clickStep,
    };
  },
});
</script>

<style></style>
