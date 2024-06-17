<script lang="ts" setup>
import FilterBar from '../components/FilterBar.vue';
import UserListTable from '../components/UserListTable.vue';
</script>
<template>
  <div class="tp-h4 mb-4">
    {{ $t('user.title.list') }}
  </div>
  <v-card flat>
    <FilterBar class="pa-4 mb-2" />
    <UserListTable />
  </v-card>
</template>
<style lang="scss" scoped></style>
