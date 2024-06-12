<script lang="ts" setup>
import AdminFormPopup from '../components/AdminFormPopup.vue';
import AdminListTable from '../components/AdminListTable.vue';
import { UseAdminStore } from '../store';

const adminStore = UseAdminStore();
</script>
<template>
  <div class="tp-h4 mb-4">
    {{ $t('admin.title.list') }}
  </div>
  <AdminListTable />
  <AdminFormPopup
    :model-value="adminStore.isOpenFormPopup"
    @update:modelValue="adminStore.setIsOpenFormPopup"
  />
</template>
<style lang="scss" scoped></style>
