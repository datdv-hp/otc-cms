<script lang="ts" setup>
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/common/constants/common.constant';

type Props = {
  totalPages: number;
  hidePaginationIfOnlyOnePage?: boolean;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
};
const itemPerPage = defineModel<number>('itemPerPage', { default: DEFAULT_PER_PAGE });
const page = defineModel<number>('page', { default: DEFAULT_PAGE });
withDefaults(defineProps<Props>(), { hidePaginationIfOnlyOnePage: true, maxLength: 7 });
const itemPerPageOptions = [1, 5, 10, 20, 50, 100];
</script>
<template>
  <v-skeleton-loader v-if="loading" type="button,text"></v-skeleton-loader>
  <div v-else class="pagination__wrapper">
    <v-pagination
      v-if="!hidePaginationIfOnlyOnePage || totalPages > 1"
      :disabled="disabled"
      v-model="page"
      :length="totalPages"
      :total-visible="maxLength"
      density="compact"
      next-icon="$common.arrow-right"
      prev-icon="$common.arrow-left"
    >
    </v-pagination>
    <div class="item-per-page_wrapper">
      <v-select
        :disabled="disabled"
        class="item-per-page"
        v-model="itemPerPage"
        :items="itemPerPageOptions"
        density="compact"
        menu-icon="$common.arrow-down"
      >
        <template #prepend-inner>
          <span class="show-text">{{ $t('common.pagination.show') }}</span>
        </template>
        <template #item="{ props: item }">
          <v-list-item variant="flat" density="compact" v-bind="item"></v-list-item>
        </template>
      </v-select>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pagination__wrapper {
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-between;
  padding: 8px 4px;
}
.item-per-page_wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  .item-per-page {
    .show-text {
      font-size: 14px;
      white-space: nowrap;
      opacity: 0.8;
    }
    max-width: fit-content;
    :deep(.v-field) {
      border-radius: 8px;
    }
    :deep(.v-field__input) {
      font-size: 15px;
      font-weight: 600;
    }
    :deep(.v-field__append-inner) {
      font-size: 13px;
    }
  }
}

:deep(.v-pagination) {
  .v-pagination__next .v-btn,
  .v-pagination__prev .v-btn {
    font-size: 13px;
  }
  .v-pagination__item--is-active {
    border: 1px solid $color-primary-1;
    border-radius: 8px;
    .v-btn {
      color: $color-primary-1;
    }
    .v-btn__overlay {
      background-color: transparent;
    }
  }
}
</style>
