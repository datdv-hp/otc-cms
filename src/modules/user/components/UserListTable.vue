<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { VDataTableServer } from 'vuetify/components/VDataTable';
import dayjs from '@/plugins/dayjs';
import { Dayjs } from 'dayjs';

const { t } = useI18n();
const loading = shallowRef(false);
const itemsPerPage = shallowRef(10);
const items = ref<any[]>([]);
const totalItems = shallowRef(0);
const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('user.fields.telegram_id'),
      key: 'telegram_id',
      fixed: true,
      width: '67',
      minWidth: '67'
    },
    {
      title: t('user.fields.telegram_usr'),
      key: 'telegram_usr',
      fixed: true,
      minWidth: '160'
    },
    {
      title: t('user.fields.daily_trading_vol'),
      key: 'daily_trading_vol',
      minWidth: '160'
    },
    {
      title: t('user.fields.monthly_trading_vol'),
      key: 'monthly_trading_vol',
      minWidth: '180'
    },
    {
      title: t('user.fields.tip'),
      key: 'tip',
      minWidth: '120'
    },
    {
      title: t('user.fields.cashback'),
      key: 'cashback',
      minWidth: '160'
    },
    {
      title: t('user.fields.last_trading_at'),
      key: 'last_trading_at',
      minWidth: '160'
    },
    {
      title: t('user.fields.last_login_at'),
      key: 'last_login_at',
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

function formatCurrenCy(value: number, params?: { lang?: string; currency?: string }) {
  const { lang = navigator.languages?.[0] || 'en-US', currency = 'USD' } = params || {};
  return Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
}

function randomDate(start?: Date | Dayjs | number, end?: Date | Dayjs | number) {
  start = dayjs(start).subtract(2, 'year').unix();
  end = dayjs(end).add(2, 'year').unix();
  return dayjs(start + Math.floor(Math.random() * (end - start)) * 1000).toDate();
}

function formatDate(value: Date | string | Dayjs) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
}
const demoItems = Array.from({ length: 100 }, (_, i) => {
  const last_login_at = randomDate(undefined, new Date());
  return {
    telegram_id: i + 1,
    telegram_usr: 'user' + i,
    daily_trading_vol: formatCurrenCy(Math.random() * 1000),
    monthly_trading_vol: formatCurrenCy(Math.random() * 10000),
    tip: Math.random() * 100,
    cashback: Math.random() * 100,
    last_trading_at: formatDate(randomDate(undefined, last_login_at)),
    last_login_at: formatDate(last_login_at)
  };
});
const FakeAPI = {
  async fetchItems(params: {
    page: number;
    itemsPerPage: number;
  }): Promise<{ items: any[]; total: number }> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const { page, itemsPerPage } = params;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedItems = demoItems.slice(start, end);
        resolve({ items: slicedItems, total: demoItems.length });
      }, 1000)
    );
  }
};

async function loadItems(options: { page: number; itemsPerPage: number }) {
  loading.value = true;
  await FakeAPI.fetchItems(options)
    .then(({ items: _items, total: _total }) => {
      items.value = _items;
      itemsPerPage.value = options.itemsPerPage;
      totalItems.value = _total;
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :items-length="totalItems"
    :fixed-header="true"
    :items="items"
    :headers="headers"
    :loading="loading"
    @update:options="loadItems"
  >
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemsPerPage}`"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.cashback`]="{ item }">
      <span>{{ item.cashback }}</span>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped>
:deep(.v-data-table-footer__items-per-page) {
  .v-field__input {
    padding: 0;
  }
}
</style>
