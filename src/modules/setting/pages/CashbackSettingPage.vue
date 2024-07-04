<script lang="ts" setup>
import CashbackSettingFilterBar from '../components/cashback/CashbackSettingFilterBar.vue';
import CashbackSettingPopup from '../components/cashback/CashbackSettingPopup.vue';
import CashbackSettingTable from '../components/cashback/CashbackSettingTable.vue';
import { UseCashbackSettingStore } from '../stores/cashback-setting.store';

const store = UseCashbackSettingStore();
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <CashbackSettingFilterBar class="mb-2" />
    <CashbackSettingTable class="flex-1" />
  </v-card>
  <CashbackSettingPopup v-if="store.dialog?.isShow" />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
