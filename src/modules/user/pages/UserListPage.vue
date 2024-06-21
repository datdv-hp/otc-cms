<script lang="ts" setup>
import FilterBar from '../components/FilterBar.vue';
import UserListTable from '../components/UserListTable.vue';
</script>
<template>
  <v-card class="card-wrapper pa-4" :elevation="1">
    <FilterBar class="mb-2" />
    <UserListTable class="flex-1" />
  </v-card>
</template>
<style lang="scss" scoped>
.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
