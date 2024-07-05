<script setup lang="ts">
import { useDisplay } from 'vuetify';
import HeaderBar from './components/header/HeaderBar.vue';
import SideBar from './components/navbar/SideBar.vue';
import MobileBottomBar from './components/navbar/MobileBottomBar.vue';
const { smAndDown } = useDisplay();
</script>

<template>
  <v-app :full-height="true">
    <SideBar v-if="!smAndDown" />
    <HeaderBar />
    <v-main>
      <div class="app-content pa-6">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </v-main>
    <MobileBottomBar v-if="smAndDown"> </MobileBottomBar>
  </v-app>
</template>

<style lang="scss" scoped></style>
