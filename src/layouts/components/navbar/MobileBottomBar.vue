<script lang="ts" setup>
import { initMobileBottomBar } from '../util';

const bottomBar = initMobileBottomBar();
const activeRouteName = ref();
</script>
<template>
  <v-bottom-navigation v-model="activeRouteName" base-color="neutral" color="neutral" nav>
    <v-btn
      v-for="item in bottomBar"
      :key="item.routeName"
      :to="{ name: item.routeName }"
      :value="item.routeName"
    >
      <span v-if="activeRouteName === item.routeName"> {{ item.title }}</span>
      <v-icon v-else :icon="item.icon"></v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style lang="scss" scoped>
:deep(.v-btn--active) {
  position: relative;
  font-weight: 600 !important;
  font-size: 13px !important;
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
