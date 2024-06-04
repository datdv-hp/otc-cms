<script setup lang="ts">
import SideBar from './components/sidebar/SideBar.vue';
</script>

<template>
  <v-app :full-height="true">
    <SideBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-app>
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
