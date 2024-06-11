<script setup lang="ts">
import ToastProvider from '@/components/toast/ToastProvider.vue';
import { RouterView } from 'vue-router';
import { useTheme } from 'vuetify';
import localStorageAuthService from './common/storages/authStorage';

const theme = useTheme();
onMounted(() => {
  const currentTheme = localStorageAuthService.getTheme();
  if (currentTheme) {
    theme.global.name.value = currentTheme;
  }
});
</script>
<template>
  <RouterView />
  <ToastProvider />
</template>
