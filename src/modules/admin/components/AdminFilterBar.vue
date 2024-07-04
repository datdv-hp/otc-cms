<script lang="ts" setup>
import { UseAdminStore } from '../store';

const { t } = useI18n();
const store = UseAdminStore();
const filter = ref({
  keyword: ''
});

function search() {
  filter.value.keyword = filter.value.keyword?.trim();
  store.patchQueryParams({ keyword: filter.value.keyword });
  store.getList();
}
</script>
<template>
  <div class="filter-wrapper d-sm-flex">
    <v-text-field
      v-model="filter.keyword"
      hide-details
      max-width="300"
      :placeholder="t('common.button.search')"
      variant="outlined"
      density="compact"
      color="primary"
    ></v-text-field>
    <v-btn
      class="text-none mt-2 mt-sm-0"
      flat
      color="primary"
      height="40"
      variant="flat"
      @click="search"
      >{{ t('common.button.search') }}</v-btn
    >
  </div>
</template>
<style lang="scss" scoped>
.filter-wrapper {
  gap: 8px;
}
</style>
