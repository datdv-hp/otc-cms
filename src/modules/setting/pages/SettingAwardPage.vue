<script lang="ts" setup>
import SettingAwardFilterBar from '../components/award/SettingAwardFilterBar.vue';
import SettingAwardFormPopup from '../components/award/SettingAwardFormPopup.vue';
import SettingAwardTable from '../components/award/SettingAwardTable.vue';
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <SettingAwardFilterBar class="mb-2" />
    <SettingAwardTable class="flex-1" />
  </v-card>
  <SettingAwardFormPopup />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
