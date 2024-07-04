<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DEFAULT_PER_PAGE, SortDirection } from '@/common/constants/common.constant';
import { formatDate, notifyError, notifySuccess } from '@/common/helper';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { systemSettingServiceApi } from '../../api';
import { UseSystemSettingStore } from '../../stores/system.setting.store';
import { ISystemSetting } from '../../type';

const { t } = useI18n();
const store = UseSystemSettingStore();
const deleting = reactive<Record<string, boolean>>({});
const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('setting.system.fields.id'),
      key: 'id',
      minWidth: '67',
      sortable: false,
      fixed: true
    },
    {
      title: t('setting.system.fields.label'),
      key: 'label',
      minWidth: '120'
    },
    {
      title: t('setting.system.fields.value'),
      key: 'value',
      minWidth: '120'
    },
    {
      title: t('setting.system.fields.createdAt'),
      key: 'createdAt',
      minWidth: '180',
      sortable: false,
      value: (item) => formatDate(item.createdAt)
    },
    {
      title: t('setting.system.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false,
      fixed: true
    }
  ];
});

const itemsPerPage = computed({
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
  store.getList();
}
async function deleteSystemSetting(item: ISystemSetting, index: number) {
  deleting[index] = true;
  try {
    const res = await systemSettingServiceApi.deleteSystemSetting(item.id);
    if (res.success) {
      notifySuccess(t('setting.system.success.delete'));
      store.patchItemInList(index);
    } else {
      notifyError(t('setting.system.error.delete'));
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    deleting[index] = false;
  }
}
</script>
<template>
  <v-data-table-server
    class="pa-4"
    v-model:items-per-page="itemsPerPage"
    :items-length="store.totalItems"
    :items="store.list"
    height="500"
    fixed-header
    :headers="headers"
    :loading="store.isLoadingList"
    @update:options="loadItems"
  >
    <template #top>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn
          :disabled="store.dialog.isShow"
          class="text-none me-6"
          color="primary"
          @click="store.openDialog()"
          >{{ $t('common.button.add') }}</v-btn
        >
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item, index: actionIndex }">
      <div class="actions">
        <BActionButton
          icon="$common.pencil"
          :tooltip="$t('common.button.edit')"
          color="neutral"
          @click="store.openDialog(item)"
        />
        <BActionButton
          icon="$common.trash"
          :tooltip="$t('common.button.delete')"
          color="neutral"
          :loading="deleting[actionIndex]"
          @click="deleteSystemSetting(item, actionIndex)"
        />
      </div>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemsPerPage}`"></v-skeleton-loader>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped></style>
