<script lang="ts" setup>
import Avatar from '@/assets/images/avatar.png';
</script>
<template>
  <v-app-bar class="app-header" flat height="96">
    <template #append>
      <v-img class="me-6" :src="Avatar" :height="48" :width="48"></v-img
    ></template>
  </v-app-bar>
</template>
<style lang="scss">
.app-header {
  &.v-theme--light {
    box-shadow: 1px 0px 0px 0px $color-neutral-2 inset;
  }
  &.v-theme--dark {
    box-shadow: 1px 0px 0px 0px $color-neutral-8 inset;
  }
}
</style>
