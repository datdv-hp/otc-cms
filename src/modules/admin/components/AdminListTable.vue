<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { formatDate } from '@/common/helper';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { AccountStatus, StatusColor } from '../constant';
import { UseAdminStore } from '../store';
import { IAdmin } from '../type';
import { randomDate } from '../util';

const { t } = useI18n();
const adminStore = UseAdminStore();
const loading = shallowRef(false);
const isCreate = shallowRef(false);
const itemsPerPage = shallowRef(10);
const items = ref<IAdmin[]>([]);
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
      title: t('admin.fields.id'),
      key: 'id',
      minWidth: '67',
      fixed: true
    },
    {
      title: t('admin.fields.fullname'),
      key: 'fullname',
      minWidth: '160'
    },
    {
      title: t('admin.fields.username'),
      key: 'username',
      minWidth: '160'
    },
    {
      title: t('admin.fields.status'),
      key: 'status',
      minWidth: '160',
      align: 'center'
    },
    {
      title: t('admin.fields.createdAt'),
      key: 'createdAt',
      minWidth: '220',
      align: 'center',
      value: (item) => formatDate(item.createdAt)
    },
    {
      title: t('admin.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false,
      fixed: true
    }
  ];
});
const demoItems: IAdmin[] = Array.from({ length: 100 }, (_, i) => {
  const isActive = Math.random() < 0.6;
  return {
    id: i + 1,
    fullname: 'user fullname' + i,
    username: 'user' + i,
    status: isActive ? AccountStatus.ACTIVE : AccountStatus.INACTIVE,
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

// function getList() {
//   adminApiService._getList({});
// }

function openFormPopup(id?: string | number) {
  adminStore.setIsOpenFormPopup(true);
  adminStore.setSelectedId(id);
}
</script>
<template>
  <v-data-table-server
    class="pa-4"
    v-model="selectedItems"
    v-model:items-per-page="itemsPerPage"
    :items-length="totalItems"
    :items="items"
    height="500"
    :headers="headers"
    :loading="loading"
    show-select
    @update:options="loadItems"
  >
    <template #top>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn
          :disabled="isCreate"
          class="text-none me-6"
          color="primary"
          @click="() => openFormPopup()"
          >{{ $t('common.button.add') }}</v-btn
        >
      </div>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemsPerPage}`"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        density="compact"
        :color="StatusColor[item.status]"
        :text="t(`admin.status.${item.status}`)"
      ></v-chip>
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
