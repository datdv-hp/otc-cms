<script lang="ts" setup>
import SystemSettingFilterBar from '../components/system/SystemSettingFilterBar.vue';
import SystemSettingPopup from '../components/system/SystemSettingPopup.vue';
import SystemSettingTable from '../components/system/SystemSettingTable.vue';
import { UseSystemSettingStore } from '../stores/system.setting.store';

const store = UseSystemSettingStore();
</script>
<template>
  <v-card class="card-wrapper pa-3" :elevation="0">
    <SystemSettingFilterBar class="mb-6" />
    <SystemSettingTable />
  </v-card>
  <SystemSettingPopup v-if="store.dialog.isShow" />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}
</style>
