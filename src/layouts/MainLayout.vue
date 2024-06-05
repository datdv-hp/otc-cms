<script setup lang="ts">
import HeaderBar from './components/header/HeaderBar.vue';
import SideBar from './components/sidebar/SideBar.vue';
</script>

<template>
  <!-- <v-app :full-height="true">
    <SideBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-app> -->
  <v-layout class="rounded rounded-md">
    <SideBar />
    <HeaderBar />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-layout>
</template>

<style lang="scss" scoped>
// :deep(v-layout),
// :deep(.v-navigation-drawer) {
//   height: 100vh !important;
// }

// :deep(.v-navigation-drawer) {
//   position: fixed !important;
// }
// :deep(.v-main) {
//   transition: all 0.24s cubic-bezier(0.4, 0, 0.2, 1) !important;
// }
</style>
