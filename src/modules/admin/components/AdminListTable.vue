<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { AccountStatus, StatusColor } from '../constant';
import { IAdmin } from '../type';
import { formatDate, randomDate } from '../util';
import { adminApiService } from '../api';

const { t } = useI18n();
const loading = shallowRef(false);
const isCreate = shallowRef(false);
const itemsPerPage = shallowRef(10);
const items = ref<IAdmin[]>([]);
const totalItems = shallowRef(0);
const selectedItems = ref();
const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('admin.fields.id'),
      key: 'id',
      minWidth: '67'
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
      sortable: false
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

function createNewAdmin() {
  isCreate.value = true;
}

function getList() {
  adminApiService._getList({});
}

const { errors } = useForm();
const { value: fullname } = useField<string>('fullname');
const { value: username } = useField<string>('username');
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
        <v-btn class="text-none" color="primary" @click="createNewAdmin">{{
          $t('common.button.add')
        }}</v-btn>
        <v-btn class="text-none" color="primary" @click="getList">{{
          $t('common.button.add')
        }}</v-btn>
      </div>
    </template>
    <template #[`body.prepend`] v-if="isCreate">
      <tr>
        <td></td>
        <td></td>
        <td>
          <v-text-field
            label="a"
            :prepend="false"
            density="comfortable"
            variant="plain"
            hide-details="auto"
            :error="!!errors.fullname"
            :error-messages="errors.fullname"
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            label="b"
            :prepend="false"
            density="comfortable"
            variant="plain"
            hide-details="auto"
            :error="!!errors.username"
            :error-messages="errors.username"
          ></v-text-field>
        </td>
        <td></td>
        <td></td>
        <td>
          <v-btn size="24" variant="tonal" color="primary" icon="mdi-pencil"></v-btn>
          <v-btn size="24" variant="tonal" color="error" icon="mdi-trash-can"></v-btn>
        </td>
      </tr>
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
<style lang="scss" scoped></style>
