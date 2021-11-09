<template>
  <div class="overflow-auto absolute top-0 left-0 right-0 bottom-50 bg-dark-bg">
    <router-view name="main-container"></router-view>
  </div>
  <van-tabbar class="absolute height-50 w-full bottom-0" v-model="active" @change="onChange">
    <van-tabbar-item name="density" icon="home-o">指标</van-tabbar-item>
    <van-tabbar-item name="news" icon="friends-o">食物</van-tabbar-item>
    <van-tabbar-item name="cookbook" icon="search">菜谱</van-tabbar-item>
    <van-tabbar-item name="profile" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script scoped lang="ts">
import { defineComponent, watch, ref } from "vue";
import { SetupContext } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MainPageLayout",
  components: {},
  setup(props, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const active = ref<string>("density");

    watch(
      () => route.query,
      () => {
        switch (route.path) {
          case "/main/density":
            active.value = "density";
            break;
          case "/main/cookbook":
            active.value = "cookbook";
            break;
          case "/main/news":
            active.value = "news";
            break;
          case "/main/profile":
            active.value = "profile";
            break;
          default:
            active.value = "profile";
            break;
        }
      },
      {
        immediate: true,
      },
    );

    const onChange = () => {
      router.push(active.value);
    };

    return {
      active,
      onChange,
    };
  },
});
</script>
<style lang="less" src="./MainPageLayout.less"></style>
