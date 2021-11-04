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
  <div class="mt-1 flex-auto">
    <div>注册</div>
    <div>忘记密码</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
// import * as crypto from "crypto-js";

export default defineComponent({
  setup() {
    const username = ref<string>("");
    const passwd = ref<string>("");
    const loading = ref<boolean>(false);

    const signIn = () => {
      loading.value = true;
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
