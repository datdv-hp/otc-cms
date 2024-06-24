<script lang="ts" setup>
import SettingCashbackPopup from '../components/cashback/SettingCashbackPopup.vue';
import SettingCashbackTable from '../components/cashback/SettingCashbackTable.vue';
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <SettingCashbackTable class="flex-1" />
  </v-card>
  <SettingCashbackPopup />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
