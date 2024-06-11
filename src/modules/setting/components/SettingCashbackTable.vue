<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { formatDate } from '@/common/helper';
import { randomDate } from '@/modules/admin/util';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { ICashbackSetting } from '../type';
import { useNow } from '@vueuse/core';
import { CreateCashbackSettingSchema } from '../constant';
import { translateYupError } from '@/common/helper';

const { t } = useI18n();
const loading = shallowRef(false);
const isCreate = shallowRef(false);
const itemsPerPage = shallowRef(10);
const items = ref<ICashbackSetting[]>([]);
const totalItems = shallowRef(0);
const selectedItems = ref();
const now = useNow();

const currentDateTime = computed(() => formatDate(now.value));
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
  const isActive = random < 0.6;
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

function createNewAdmin() {
  isCreate.value = true;
}

const { errors, resetForm, handleSubmit } = useForm({
  validationSchema: CreateCashbackSettingSchema
});
const { value: name } = useField<string>('name');
const { value: cashbackValue } = useField<string>('cashbackValue');
function cancelCreateForm() {
  resetForm();
  isCreate.value = false;
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
    fixed-header
    :headers="headers"
    :loading="loading"
    show-select
    @update:options="loadItems"
  >
    <template #top>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn v-if="!isCreate" class="text-none me-6" color="primary" @click="createNewAdmin">{{
          $t('common.button.add')
        }}</v-btn>
      </div>
    </template>
    <template #[`body.prepend`] v-if="isCreate">
      <tr class="create-form">
        <td class="v-data-table-column--fixed" :style="{ width: '56px' }"></td>
        <td
          class="v-data-table-column--fixed v-data-table-column--last-fixed"
          :style="{ left: '56px' }"
        ></td>
        <td class="pb-1">
          <v-text-field
            v-model="name"
            :prepend="false"
            density="comfortable"
            variant="plain"
            :placeholder="t('setting.placeholder.name')"
            auto-focus
            hide-details="auto"
            :error="!!errors.name"
            :error-messages="translateYupError(errors.name)"
          ></v-text-field>
        </td>
        <td class="pb-1">
          <v-text-field
            :placeholder="t('setting.placeholder.cashback')"
            v-model="cashbackValue"
            type="number"
            hide-spin-buttons
            density="comfortable"
            variant="plain"
            hide-details="auto"
            :error="!!errors.cashbackValue"
            :error-messages="translateYupError(errors.cashbackValue)"
          ></v-text-field>
        </td>
        <td align="center">{{ currentDateTime }}</td>
        <td>
          <v-btn size="24" variant="tonal" color="primary" icon="$common.check"></v-btn>
          <v-btn
            @click="cancelCreateForm"
            class="ms-2"
            size="24"
            variant="tonal"
            icon="$common.close"
          ></v-btn>
        </td>
      </tr>
    </template>
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
