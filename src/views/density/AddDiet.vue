<template>
  <van-nav-bar
    :title="title"
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
    v-model="diet.dietTime"
    label="进食时间"
    placeholder="点击选择时间"
    @click="showDietTimePicker = true"
  />
  <van-popup v-model:show="showDietTimePicker" overlay="true" position="bottom">
    <van-datetime-picker
      type="time"
      title="选择时间"
      @cancle="showDietTimePicker = false"
      @confirm="setDietTime"
    />
  </van-popup>
  <van-field
    readonly
    clickable
    name="food-picker"
    label="食物种类"
    v-model="dietTypeColumns[diet.dietType]"
    placeholder="选择食物"
    @click="showDietTypePicker = true"
  />
  <van-popup v-model:show="showDietTypePicker" round position="bottom">
    <van-picker
      show-toolbar
      :columns="dietTypeColumns"
      @cancel="showDietTypePicker = false"
      @confirm="setDietType"
    />
  </van-popup>
  <van-field
    v-if="diet.dietType === 0"
    readonly
    clickable
    name="milk-picker"
    label="特奶品牌"
    v-model="smilkTypeColumns[diet.smilkType]"
    placeholder="选择食物"
    @click="showSmilkTypePicker = true"
  />
  <van-popup v-model:show="showSmilkTypePicker" round position="bottom">
    <van-picker
      show-toolbar
      :columns="smilkTypeColumns"
      @cancel="showSmilkTypePicker = false"
      @confirm="setSmilkType"
    />
  </van-popup>
  <van-field v-if="diet.dietType === 0" v-model="diet.specialMilk" type="number" label="特奶量(ml)" />
  <van-field v-else-if="diet.dietType === 1" v-model="diet.breastMilk" type="number" label="母乳量(ml)" />
  <div v-else class="flex flex-row text-xs text-gray-600">
    <div class="leading-8 pl-3 text-left" style="width: 7.8em; margin-left: 1px">食物名称</div>
    <vue3-simple-typeahead
      id="typeahead_id"
      placeholder="输入进行查找..."
      class="text-left pl-3"
      :items="foodItems"
      :minInputLength="1"
      :itemProjection="itemProjectionFunction"
      @selectItem="selectItemEventHandler"
      @onInput="onInputEventHandler"
      @onFocus="onFocusEventHandler"
      @onBlur="onBlurEventHandler"
    >
    </vue3-simple-typeahead>
  </div>
  <div v-if="diet.dietType !== 1 && diet.dietType !== 0" class="ml-4 mr-4 border-b border-gray-100"></div>
  <div v-if="diet.dietType !== 1 && diet.dietType !== 0">
    <van-field v-model="diet.foodAmount" type="number" label="食物重量(g)" />
  </div>
  <div v-if="diet.dietType !== 1 && diet.dietType !== 0" class="ml-4 mr-4 border-b border-gray-100"></div>
  <van-field v-model="diet.pheValue" type="number" label="苯计算(mg)" />
  <van-field
    v-model="diet.dietContent"
    rows="3"
    autosize
    label="食物记录"
    type="textarea"
    placeholder="请输入食物"
  />
  <div class="p-4">
    <van-button type="primary" block class="mt-2" @click="saveDiet">保存</van-button>
    <van-button v-if="isEdit" type="danger" block class="mt-2" @click="removeDiet(diet.uuid)">
      移除
    </van-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import useDiet from "./hooks/useDiet";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isEdit = computed(() => route?.path?.includes("editDiet"));

    const {
      title,
      diet,
      dietTypeColumns,
      smilkTypeColumns,
      showDietTimePicker,
      showDietTypePicker,
      showSmilkTypePicker,
      foodItems,
      onClickLeft,
      onClickRight,
      setDietTime,
      setDietType,
      setSmilkType,
      onInputEventHandler,
      itemProjectionFunction,
      selectItemEventHandler,
      saveDiet,
      removeDiet,
    } = useDiet(route, router);

    return {
      isEdit,
      title,
      diet,
      dietTypeColumns,
      smilkTypeColumns,
      showDietTimePicker,
      showDietTypePicker,
      showSmilkTypePicker,
      onClickLeft,
      onClickRight,
      setDietTime,
      setDietType,
      setSmilkType,
      saveDiet,
      removeDiet,
      foodItems,
      onInputEventHandler,
      itemProjectionFunction,
      selectItemEventHandler,
    };
  },
});
</script>

<style>
.simple-typeahead-input {
  padding-left: 22px !important;
  line-height: 2.5;
}
.simple-typeahead-list {
  width: 90% !important;
}
</style>
