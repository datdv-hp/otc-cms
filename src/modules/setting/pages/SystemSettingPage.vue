<script lang="ts" setup>
import SystemSettingFilterBar from '../components/system/SystemSettingFilterBar.vue';
import SystemSettingPopup from '../components/system/SystemSettingPopup.vue';
import SystemSettingTable from '../components/system/SystemSettingTable.vue';
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <SystemSettingFilterBar class="mb-2" />
    <SystemSettingTable class="flex-1" />
  </v-card>
  <SystemSettingPopup />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
