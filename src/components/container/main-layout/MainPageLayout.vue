<template>
  <div class="overflow-auto absolute top-0 left-0 right-0 bottom-50">
    <router-view></router-view>
  </div>
  <var-tabs
    class="absolute height-50 w-full bottom-0"
    elevation
    item-direction="vertical"
    color="#2979ff"
    active-color="#fff"
    inactive-color="hsla(0, 0%, 100%, .6)"
    v-model:active="active5"
  >
    <var-tab>
      <var-icon class="icon" name="information" />
      <div>选项1</div>
    </var-tab>
    <var-tab>
      <var-icon class="icon" name="warning" />
      <div>选项2</div>
    </var-tab>
    <var-tab>
      <var-icon class="icon" name="error" />
      <div>选项3</div>
    </var-tab>
    <var-tab>
      <var-icon name="account-circle" />
      <div>我的</div>
    </var-tab>
  </var-tabs>
</template>

<script scoped lang="ts">
export default {
  name: "MainPageLayout",
  components: {},
};
</script>
<style lang="less" src="./MainPageLayout.less"></style>
