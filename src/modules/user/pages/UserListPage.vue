<script lang="ts" setup>
import FilterBar from '../components/FilterBar.vue';
import UserListTable from '../components/UserListTable.vue';
import UserRefundUpdateDialog from '../components/UserRefundUpdateDialog.vue';
import { UseUserStore } from '../store';

const store = UseUserStore();
</script>
<template>
  <v-card class="card-wrapper pa-3" :elevation="0">
    <FilterBar class="mb-6" />
    <UserListTable />
  </v-card>
  <UserRefundUpdateDialog v-if="store.refundDialog.isShow" />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}
</style>
