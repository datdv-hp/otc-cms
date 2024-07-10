<script setup lang="ts">
import HeaderBar from './components/header/HeaderBar.vue';
import SideBar from './components/navbar/SideBar.vue';
</script>

<template>
  <v-app :full-height="true">
    <SideBar />
    <HeaderBar />
    <v-main>
      <div class="app-content pa-6">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
:deep(.v-main) {
  background-image: url('/src/assets/images/wallpaper.png');
  background-size: cover;
}
</style>
