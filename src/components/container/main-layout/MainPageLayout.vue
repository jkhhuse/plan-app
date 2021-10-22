<template>
  <div class="overflow-auto absolute top-0 left-0 right-0 bottom-50">
    <router-view name="main-container"></router-view>
  </div>
  <van-tabbar class="absolute height-50 w-full bottom-0" v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o">标签 1</van-tabbar-item>
    <van-tabbar-item icon="search">标签 2</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签 3</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script scoped lang="ts">
export default {
  name: "MainPageLayout",
  components: {},
};
</script>
<style lang="less" src="./MainPageLayout.less"></style>
