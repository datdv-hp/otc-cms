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
    <!-- <MobileBottomBar v-if="smAndDown"> </MobileBottomBar> -->
  </v-app>
</template>

<style lang="scss" scoped></style>
