<script lang="ts" setup>
import { DEFAULT_PER_PAGE, SortDirection } from '@/common/constants/common.constant';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { UserTransactionType } from '../constant';
import { UseUserStore } from '../store';
import { IUserTransaction } from '../type';
import MPagination from '@/components/molecules/MPagination.vue';

const { t } = useI18n();
const store = UseUserStore();
const route = useRoute();

function addVolumnMarker(item: IUserTransaction) {
  return item.type === UserTransactionType.IN
    ? `+${item.volumn}`
    : item.type === UserTransactionType.OUT
      ? `-${item.volumn}`
      : item.volumn;
}

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
      title: t('user.fields.transactionDateAt'),
      key: 'createdAt',
      minWidth: '120',
      sortable: false
    },
    {
      title: t('user.fields.transactionVolumn'),
      key: 'volumn',
      minWidth: '120',
      sortable: false
    },

    {
      title: t('user.fields.transactionChainType'),
      key: 'chainType',
      minWidth: '120',
      sortable: false,
      value: (item: Record<string, any>): any => {
        return t(`user.chainType.${item.chainType}`);
      }
    },
    {
      title: t('user.fields.transactionFee'),
      key: 'fee',
      sortable: false
    },
    {
      title: t('user.fields.tip'),
      key: 'tip',
      sortable: false
    },
    {
      title: t('user.fields.transactionTokenAddress'),
      key: 'tokenAddress',
      minWidth: '110',
      sortable: false
    }
  ];
});

const itemPerPage = computed({
  get: () => store.transactionQueryParams.per_page || DEFAULT_PER_PAGE,
  set: (value: number) => {
    store.patchTransactionQueryParams({ per_page: value });
  }
});

async function loadItems(options: {
  page?: number;
  itemsPerPage?: number;
  sortBy?: { key: string; order: SortDirection }[];
}) {
  store.patchTransactionQueryParams({
    page: options.page,
    per_page: options.itemsPerPage,
    sort: options.sortBy?.[0]?.order,
    order_by: snakeCase(options.sortBy?.[0]?.key)
  });
  store.getUserTransactions(route.params.id as string);
}

onUnmounted(() => {
  store.setTransactionQueryParams({});
  store.setTransactions([]);
  store.setTotalTransactions(0);
  store.setTransactionLastPage(0);
});

defineExpose({
  loadItems
});
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemPerPage"
    :items-length="store.totalTransactions"
    :page="store.transactionQueryParams.page"
    :items="store.transactions"
    :headers="headers"
    :loading="store.isLoadingTransactions"
    @update:options="loadItems"
  >
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemPerPage}`"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.index`]="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template v-slot:[`item.volumn`]="{ item }">
      <span
        class="volumn"
        :class="{
          in: item.type === UserTransactionType.IN,
          out: item.type === UserTransactionType.OUT
        }"
        >{{ addVolumnMarker(item) }}</span
      >
    </template>
    <template #bottom="{ pageCount }">
      <v-divider></v-divider>
      <MPagination
        v-model:item-per-page="store.transactionQueryParams.per_page"
        v-model:page="store.transactionQueryParams.page"
        :total-pages="pageCount"
        :disabled="store.isLoadingTransactions"
        :loading="store.isLoadingTransactions"
      ></MPagination>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped>
:deep(.v-table) {
  min-height: 300px;
}
.volumn {
  &.in {
    color: $color-primary-1;
  }
  &.out {
    color: $color-primary-3;
  }
}
</style>
