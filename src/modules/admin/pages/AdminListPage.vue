<script lang="ts" setup>
import AdminFormPopup from '../components/AdminFormPopup.vue';
import AdminListTable from '../components/AdminListTable.vue';
import AdminFilterBar from '../components/AdminFilterBar.vue';
import { UseAdminStore } from '../store';

const adminStore = UseAdminStore();
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <AdminFilterBar />
    <AdminListTable />
  </v-card>
  <AdminFormPopup v-if="adminStore.dialog.isShow" />
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
