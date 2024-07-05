<script lang="ts" setup>
import MSearchBar from '@/components/molecules/MSearchBar.vue';
import { UseUserStore } from '../store';

const store = UseUserStore();
const filter = ref({
  keyword: ''
});

function search() {
  filter.value.keyword = filter.value.keyword?.trim();
  store.patchQueryParams({ keyword: filter.value.keyword });
  store.getList();
}

onMounted(() => {
  filter.value.keyword = store.queryParams?.keyword || '';
});
</script>
<template>
  <MSearchBar @search="search" v-model:keyword="filter.keyword" :loading="store.isLoadingList">
  </MSearchBar>
</template>
<style lang="scss" scoped></style>
