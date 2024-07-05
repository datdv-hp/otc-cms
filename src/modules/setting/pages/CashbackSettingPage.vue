<script lang="ts" setup>
import CashbackSettingFilterBar from '../components/cashback/CashbackSettingFilterBar.vue';
import CashbackSettingPopup from '../components/cashback/CashbackSettingPopup.vue';
import CashbackSettingTable from '../components/cashback/CashbackSettingTable.vue';
import { UseCashbackSettingStore } from '../stores/cashback-setting.store';

const store = UseCashbackSettingStore();
</script>
<template>
  <v-card class="card-wrapper pa-3" :elevation="0">
    <CashbackSettingFilterBar />
    <CashbackSettingTable />
  </v-card>
  <CashbackSettingPopup v-if="store.dialog?.isShow" />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}
</style>
