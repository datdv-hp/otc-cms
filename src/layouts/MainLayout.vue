<script setup lang="ts">
import FooterBar from './components/footer/FooterBar.vue';
import HeaderBar from './components/header/HeaderBar.vue';
import SideBar from './components/sidebar/SideBar.vue';
</script>

<template>
  <v-app :full-height="true">
    <SideBar />
    <HeaderBar />
    <v-main style="min-height: 300px">
      <div class="app-content pa-4">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<style lang="scss" scoped></style>
