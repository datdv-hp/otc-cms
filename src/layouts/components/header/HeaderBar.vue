<script lang="ts" setup>
import LogoImage from '@/assets/images/logo.png';
import { UseAppStore } from '@/common/app.store';
import { IBreadcrumb } from '@/layouts/type';
import AccountMenu from './AccountMenu.vue';

const appStore = UseAppStore();
const route = useRoute();
const breadcrumbs = computed(() => route.meta.breadcrumbs as IBreadcrumb[]);
function toggleSidebar() {
  appStore.setIsShowSidebar(!appStore.isShowSidebar);
}

const headerHeight = computed(() => (appStore.isTemporarySidebar ? 60 : 84));
const avatarSize = computed(() => (appStore.isTemporarySidebar ? '24px' : '36px'));
</script>
<template>
  <v-app-bar :height="headerHeight" class="header-bar">
    <template #append>
      <AccountMenu :avatar-size="avatarSize" />
    </template>
    <template #prepend>
      <template v-if="appStore.isTemporarySidebar">
        <v-icon class="me-3" icon="$sidebar.layout" @click="toggleSidebar" />
        <v-img v-if="appStore.isTemporarySidebar" :src="LogoImage" width="36" height="36" />
      </template>
      <v-breadcrumbs v-else class="pa-0" :items="breadcrumbs" />
    </template>
    <template #extension v-if="appStore.isTemporarySidebar">
      <v-breadcrumbs class="pa-0" :items="breadcrumbs" density="compact" />
    </template>
  </v-app-bar>
</template>
<style lang="scss" scoped>
:global(.header-bar.v-toolbar) {
  background: url('/src/assets/images/wallpaper.png') !important;
  backdrop-filter: blur(10px);
}
:deep(.v-toolbar__content) {
  filter: none;
  padding: 0 20px;
  .v-toolbar-title {
    font-size: 16px;
  }
}
:deep(.v-toolbar__extension) {
  background-color: #00000099;
  backdrop-filter: blur(1px);
  font-size: 13px;
  padding: 0 20px;
}
</style>
