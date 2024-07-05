<script lang="ts" setup>
import { useWindowScroll, watchThrottled } from '@vueuse/core';
import { initMobileBottomBar } from '../util';
import { PageName } from '@/common/constants/common.constant';

const { y } = useWindowScroll();
const showBottomBar = ref(true);

watchThrottled(
  y,
  (value, oldValue) => {
    console.log(value, oldValue);
    showBottomBar.value = !(value > oldValue + 3);
  },
  { throttle: 600, trailing: false }
);

const bottomBar = initMobileBottomBar();
const isActiveRoute = (routeName?: PageName) => {
  return activeRouteName.value === routeName;
};
const activeRouteName = ref();
</script>
<template>
  <v-bottom-navigation
    :active="showBottomBar"
    v-model="activeRouteName"
    base-color="neutral"
    color="neutral"
    nav
  >
    <v-btn
      v-for="item in bottomBar"
      :key="item.routeName"
      :class="{ 'px-0': !isActiveRoute(item.routeName), 'px-2': isActiveRoute(item.routeName) }"
      :to="{ name: item.routeName }"
      :value="item.routeName"
      :ripple="false"
      min-width="80"
      max-width="120"
      align="center"
    >
      <span v-show="isActiveRoute(item.routeName)"> {{ item.title }}</span>
      <v-icon v-show="!isActiveRoute(item.routeName)" :icon="item.icon"></v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style lang="scss" scoped>
:deep(.v-btn--active) {
  position: relative;
  font-weight: 600 !important;
  > ::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: rgb(var(--v-theme-primary));
  }
}
</style>
