<script lang="ts" setup>
import { IBreadcrumb } from '@/layouts/type';
import AccountMenu from './AccountMenu.vue';
import { UseAppStore } from '@/common/app.store';
const route = useRoute();
const breadcrumbs = computed(() => route.meta.breadcrumbs as IBreadcrumb[]);
const appStore = UseAppStore();

function toggleSidebar() {
  appStore.setIsShowSidebar(!appStore.isShowSidebar);
}
</script>
<template>
  <v-app-bar flat class="app-header px-5" height="84">
    <template #prepend>
      <v-breadcrumbs :items="breadcrumbs">
        <template #prepend v-if="!appStore.isShowSidebar">
          <v-icon icon="$sidebar.layout" @click="toggleSidebar"></v-icon>
        </template>
      </v-breadcrumbs>
    </template>
    <template #append>
      <AccountMenu />
    </template>
  </v-app-bar>
</template>
<style lang="scss"></style>
