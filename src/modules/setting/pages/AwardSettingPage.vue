<script lang="ts" setup>
import AwardSettingFilterBar from '../components/award/AwardSettingFilterBar.vue';
import AwardSettingFormPopup from '../components/award/AwardSettingFormPopup.vue';
import AwardSettingTable from '../components/award/AwardSettingTable.vue';
import { UseAwardSettingStore } from '../stores/award-setting.store';
const store = UseAwardSettingStore();
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <AwardSettingFilterBar class="mb-2" />
    <AwardSettingTable class="flex-1" />
  </v-card>
  <AwardSettingFormPopup v-if="store.dialog?.isShow" />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
