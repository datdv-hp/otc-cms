<script lang="ts" setup>
import AdminFormPopup from '../components/AdminFormPopup.vue';
import AdminListTable from '../components/AdminListTable.vue';
import { UseAdminStore } from '../store';

const adminStore = UseAdminStore();
</script>
<template>
  <AdminListTable />
  <AdminFormPopup
    :model-value="adminStore.isOpenFormPopup"
    @update:modelValue="adminStore.setIsOpenFormPopup"
  />
</template>
<style lang="scss" scoped></style>
