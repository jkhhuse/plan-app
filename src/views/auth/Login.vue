<template>
  <div class="grid justify-items-center m-20">
    <img class="status_img" :src="require(`@/assets/logo.svg`)" />
  </div>
  <div class="mt-8 ml-8 mr-8">
    <van-field v-model="username" label="用户名" left-icon="user-circle-o" placeholder="请输入用户名" />
    <van-field v-model="passwd" label="密码" left-icon="closed-eye" placeholder="请输入密码" />
    <van-button
      type="success"
      block
      class="mt-6"
      color="#42B983"
      :loading="loading"
      @click="signIn"
      loading-text="登录中..."
    >
      登录
    </van-button>
  </div>
  <div class="mt-1 ml-8 mr-8 flex flex-row flex-auto text-sm justify-between">
    <div class="hover:text-green-500">忘记密码</div>
    <div class="hover:text-green-500">注册</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { login } from "@/action/auth/auth";
import { HttpMessage } from "@/types/index";
// import * as crypto from "crypto-js";

export default defineComponent({
  setup() {
    const username = ref<string>("");
    const passwd = ref<string>("");
    const loading = ref<boolean>(false);

    const signIn = () => {
      // loading.value = true;
      // eslint-disable-next-line no-debugger
      // 获得 token
      login({
        username: username.value,
        passwd: passwd.value,
      }).subscribe((res: HttpMessage<string>) => {
        if (res.code === "200") {
          //
          console.log("success");
        }
      });
    };

    return {
      username,
      passwd,
      loading,
      signIn,
    };
  },
});
</script>

<style></style>
