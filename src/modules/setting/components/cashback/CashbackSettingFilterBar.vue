<script lang="ts" setup>
import MSearchBar from '@/components/molecules/MSearchBar.vue';
import { UseCashbackSettingStore } from '../../stores/cashback-setting.store';
import { UseAppStore } from '@/common/app.store';

const store = UseCashbackSettingStore();
const appStore = UseAppStore();
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
      <div class="append__wrapper">
        <v-spacer></v-spacer>
        <v-btn
          v-if="appStore.isMinDisplayWidth"
          icon="$common.add"
          density="comfortable"
          rounded="lg"
          color="primary"
          variant="flat"
          @click="store.openDialog()"
        ></v-btn>
        <v-btn
          v-else
          class="text-none"
          prepend-icon="$common.add"
          color="primary"
          variant="flat"
          rounded="lg"
          @click="store.openDialog()"
          >{{ $t('common.button.add') }}</v-btn
        >
      </div>
    </template>
  </MSearchBar>
</template>
<style lang="scss" scoped>
.append__wrapper {
  flex: 1 1;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
