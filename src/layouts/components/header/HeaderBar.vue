<script lang="ts" setup>
import { IBreadcrumb } from '@/layouts/type';
import { useDisplay } from 'vuetify';
import AccountMenu from './AccountMenu.vue';
const route = useRoute();
const breadcrumbs = computed(() => route.meta.breadcrumbs as IBreadcrumb[]);
const { smAndDown } = useDisplay();

const height = computed(() => (smAndDown.value ? 60 : 84));
</script>
<template>
  <v-app-bar flat class="app-header px-5" :height="height">
    <template #prepend>
      <v-breadcrumbs :items="breadcrumbs"> </v-breadcrumbs>
    </template>
    <template #append>
      <AccountMenu />
    </template>
  </v-app-bar>
</template>
<style lang="scss"></style>
