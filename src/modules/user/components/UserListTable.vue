<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DATE_TIME_FORMAT, PageName } from '@/common/constants/common.constant';
import { randomDate } from '@/modules/admin/util';
import dayjs from '@/plugins/dayjs';
import { Dayjs } from 'dayjs';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { IUserListItem } from '../type';

const { t } = useI18n();
const router = useRouter();
const loading = shallowRef(false);
const itemsPerPage = shallowRef(10);
const items = ref<any[]>([]);
const totalItems = shallowRef(0);
const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('user.fields.index'),
      key: 'index',
      fixed: true,
      width: '67',
      minWidth: '67',
      maxWidth: '67',
      align: 'center',
      sortable: false
    },
    {
      title: t('user.fields.telegramId'),
      key: 'telegramId',
      fixed: true,
      minWidth: '160'
    },
    {
      title: t('user.fields.tradingVolumeInMonth'),
      key: 'tradingVolumeInMonth',
      minWidth: '160'
    },
    {
      title: t('user.fields.lastTradingAt'),
      key: 'lastTradingAt',
      minWidth: '180'
    },
    {
      title: t('user.fields.lastCashbackAt'),
      key: 'lastCashbackAt',
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

function formatCurrenCy(value: number, params?: { lang?: string; currency?: string }) {
  const { lang = navigator.languages?.[0] || 'en-US', currency = 'USD' } = params || {};
  return Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
}

function formatDate(value: Date | string | Dayjs) {
  return dayjs(value).format(DATE_TIME_FORMAT.YYYYMMDDHHmmss_HYPHEN);
}
const demoItems = Array.from({ length: 100 }, (_, i) => {
  const lastTradingAt = randomDate(new Date(), 365 * 2);
  return {
    id: i + 1,
    telegramId: 'user' + i,
    tradingVolumeInMonth: formatCurrenCy(Math.random() * 1000),
    lastTradingAt: formatDate(lastTradingAt),
    lastCashbackAt: formatDate(randomDate(lastTradingAt, 365 * 2)),
    f1Count: Math.floor(Math.random() * 100)
  } as IUserListItem;
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

function toDetail(item: IUserListItem) {
  router.push({ name: PageName.USER_DETAIL_PAGE, params: { id: item.id } });
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
    <template v-slot:[`item.index`]="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template v-slot:[`item.telegramId`]="{ item }">
      <a :href="`https://t.me/${item.telegramId}`" target="_blank">{{ item.telegramId }}</a>
    </template>
    <template v-slot:[`item.cashback`]="{ item }">
      <span>{{ item.cashback }}</span>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="actions">
        <BActionButton
          icon="$common.eye"
          :tooltip="$t('user.tooltip.detail')"
          @click="toDetail(item)"
        />
        <BActionButton icon="$common.more-horizontal" :tooltip="$t('user.tooltip.more')" />
        <!-- <v-btn density="comfortable" variant="text" icon="$common.more-horizontal" /> -->
      </div>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped>
:deep(.v-data-table-footer__items-per-page) {
  .v-field__input {
    padding: 0;
  }
}

// .actions {
//   opacity: 0.7;
// }
</style>
