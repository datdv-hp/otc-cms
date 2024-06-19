<script lang="ts" setup>
import { DEFAULT_PER_PAGE } from '@/common/constants/common.constant';
import { UseUserStore } from '../store';
import { VDataTableServer } from 'vuetify/components/VDataTable';

const { t } = useI18n();
const loading = shallowRef(false);
const store = UseUserStore();
const route = useRoute();

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
      title: t('user.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false
    }
  ];
});

async function fetchF1UserList() {
  loading.value = true;
  try {
    store.patchQueryParams({ parent_id: +route.params.id as number });
    await store.getList();
  } finally {
    loading.value = false;
  }
}

async function loadItems(options: { page: number; itemsPerPage: number }) {
  loading.value = true;
  try {
    store.patchQueryParams({
      page: options.page,
      per_page: options.itemsPerPage
    });
    await store.getList();
  } finally {
    loading.value = false;
  }
}

const itemPerPage = computed({
  get: () => store.queryParams.per_page || DEFAULT_PER_PAGE,
  set: (value: number) => {
    store.patchQueryParams({ per_page: value });
  }
});

onMounted(() => {
  fetchF1UserList();
});
</script>
<template>
  <v-expansion-panels :elevation="1">
    <v-expansion-panel :title="t('user.section.f1Title')">
      <template #text>
        <v-data-table-server
          v-model:items-per-page="itemPerPage"
          :items-length="store.totalItems"
          fixed-header
          :items="store.list"
          :headers="headers"
          :loading="loading"
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
          <template v-slot:[`item.actions`]>
            <div class="actions">
              <BActionButton icon="$common.eye" :tooltip="$t('user.tooltip.detail')" />
              <BActionButton icon="$common.more-horizontal" :tooltip="$t('user.tooltip.more')" />
              <!-- <v-btn density="comfortable" variant="text" icon="$common.more-horizontal" /> -->
            </div>
          </template>
        </v-data-table-server>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style lang="scss" scoped></style>
