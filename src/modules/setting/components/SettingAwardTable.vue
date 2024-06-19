<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { formatDate } from '@/common/helper';
import { randomDate } from '@/modules/admin/util';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { CreateCashbackSettingSchema } from '../constant';
import { ICashbackSetting } from '../type';

const { t } = useI18n();
const loading = shallowRef(false);
const itemsPerPage = shallowRef(10);
const items = ref<ICashbackSetting[]>([]);
const totalItems = shallowRef(0);
const selectedItems = ref();

const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      key: 'data-table-select',
      minWidth: '56',
      width: '56',
      fixed: true
    },
    {
      title: t('setting.fields.id'),
      key: 'id',
      minWidth: '67',
      fixed: true
    },
    {
      title: t('setting.fields.name'),
      key: 'name',
      minWidth: '160'
    },
    {
      title: t('setting.fields.cashback'),
      key: 'cashbackValue',
      minWidth: '160'
    },
    {
      title: t('setting.fields.createdAt'),
      key: 'createdAt',
      minWidth: '220',
      align: 'center',
      value: (item) => formatDate(item.createdAt)
    },
    {
      title: t('setting.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false,
      fixed: true
    }
  ];
});

const demoItems: ICashbackSetting[] = Array.from({ length: 100 }, (_, i) => {
  const random = Math.random();
  return {
    id: i + 1,
    name: 'cashback' + i,
    cashbackValue: Math.round(random * 100) % 30,
    createdAt: randomDate(new Date(), 365 * 2)
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

useForm({
  validationSchema: CreateCashbackSettingSchema
});
useField<string>('name');
useField<string>('cashbackValue');
</script>
<template>
  <v-data-table-server
    v-model="selectedItems"
    v-model:items-per-page="itemsPerPage"
    :items-length="totalItems"
    :items="items"
    height="500"
    fixed-header
    :headers="headers"
    :loading="loading"
    show-select
    @update:options="loadItems"
  >
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemsPerPage}`"></v-skeleton-loader>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped>
.create-form {
  :deep(.v-field__input) {
    padding-top: 0;
  }
}
</style>
