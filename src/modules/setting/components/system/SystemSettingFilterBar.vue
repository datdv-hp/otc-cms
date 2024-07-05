<script lang="ts" setup>
import MSearchBar from '@/components/molecules/MSearchBar.vue';
import { UseSystemSettingStore } from '../../stores/system.setting.store';

const store = UseSystemSettingStore();
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
  <MSearchBar @search="search" v-model:keyword="filter.keyword" :loading="store.isLoadingList">
  </MSearchBar>
</template>
<style lang="scss" scoped></style>
