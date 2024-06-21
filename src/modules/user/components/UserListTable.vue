<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DEFAULT_PER_PAGE, PageName, SortDirection } from '@/common/constants/common.constant';
import { IActionOption } from '@/common/type';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { UserStatus } from '../constant';
import { UseUserStore } from '../store';
import { IUserListItem } from '../type';

const { t } = useI18n();
const router = useRouter();
const store = UseUserStore();

const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('user.fields.index'),
      key: 'index',
      width: '50',
      minWidth: '50',
      maxWidth: '50',
      align: 'center',
      sortable: false
    },
    {
      title: t('user.fields.telegramUsername'),
      key: 'telegramUsername',
      fixed: true,
      minWidth: '140'
    },
    {
      title: t('user.fields.transactionToday'),
      key: 'transactionToday',
      minWidth: '180'
    },
    {
      title: t('user.fields.lastTransactionAt'),
      key: 'lastTransactionAt',
      minWidth: '180'
    },
    {
      title: t('user.fields.lastClaimAt'),
      key: 'lastClaimAt',
      minWidth: '180'
    },
    {
      title: t('user.fields.f1Count'),
      key: 'f1Count',
      minWidth: '160'
    },
    {
      title: t('user.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false
    }
  ];
});

const itemPerPage = computed({
  get: () => store.queryParams.per_page || DEFAULT_PER_PAGE,
  set: (value: number) => {
    store.patchQueryParams({ per_page: value });
  }
});

async function loadItems(options: {
  page?: number;
  itemsPerPage?: number;
  sortBy?: { key: string; order: SortDirection }[];
}) {
  store.patchQueryParams({
    page: options.page,
    per_page: options.itemsPerPage,
    sort: options.sortBy?.[0]?.order,
    order_by: snakeCase(options.sortBy?.[0]?.key)
  });
  await store.getList();
}

function toDetail(item: IUserListItem) {
  router.push({ name: PageName.USER_DETAIL_PAGE, params: { id: item.id } });
}

onUnmounted(() => {
  store.setQueryParams({});
  store.setList([]);
  store.setTotalItems(0);
  store.setLastPage(0);
});

defineExpose({
  loadItems
});
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemPerPage"
    :items-length="store.totalItems"
    fixed-header
    :items="store.list"
    :headers="headers"
    :loading="store.isLoadingList"
    @update:options="loadItems"
  >
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemPerPage}`"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.index`]="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template v-slot:[`item.telegramUsername`]="{ item }">
      <a :href="`https://t.me/${item.telegramUsername}`" target="_blank">{{
        item.telegramUsername
      }}</a>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="actions">
        <BActionButton
          icon="$common.eye"
          :tooltip="$t('user.tooltip.detail')"
          @click="toDetail(item)"
        />
      </div>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped>
:deep(.v-table) {
  min-height: 300px;
}
</style>
