<script lang="ts" setup>
import MSearchBar from '@/components/molecules/MSearchBar.vue';
import { UseCashbackSettingStore } from '../../stores/cashback-setting.store';

const store = UseCashbackSettingStore();
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
    <template #append>
      <v-btn
        class="text-none"
        prepend-icon="$common.add"
        color="primary"
        variant="flat"
        @click="() => store.openDialog()"
        >{{ $t('common.button.add') }}
      </v-btn>
    </template>
  </MSearchBar>
</template>
<style lang="scss" scoped>
.filter-wrapper {
  gap: 8px;
}
</style>
