<script lang="ts" setup>
import AccountMenu from './AccountMenu.vue';
</script>
<template>
  <v-app-bar flat class="app-header" height="60">
    <template #append>
      <AccountMenu />
    </template>
  </v-app-bar>
</template>
<style lang="scss">
// .app-header {
//   &.v-theme--light {
//     box-shadow: 1px 0px 0px 0px $color-neutral-2 inset;
//   }
//   &.v-theme--dark {
//     box-shadow: 1px 0px 0px 0px $color-neutral-8 inset;
//   }
// }
</style>
