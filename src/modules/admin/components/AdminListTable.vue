<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DEFAULT_PER_PAGE, SortDirection } from '@/common/constants/common.constant';
import { formatDate, notifyError, notifySuccess } from '@/common/helper';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { adminApiService } from '../api';
import { UseAdminStore } from '../store';
import { IAdmin } from '../type';
import { showDialogConfirm } from '@/plugins/vuetify/dialog-confirm/util';

const { t } = useI18n();
const deleting = reactive<Record<string, boolean>>({});
const adminStore = UseAdminStore();

const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
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
const itemsPerPage = computed({
  get: () => adminStore.queryParams.per_page || DEFAULT_PER_PAGE,
  set: (value: number) => {
    adminStore.patchQueryParams({ per_page: value });
  }
});

async function loadItems(options: {
  page?: number;
  itemsPerPage?: number;
  sortBy?: { key: string; order: SortDirection }[];
}) {
  adminStore.patchQueryParams({
    page: options.page,
    per_page: options.itemsPerPage,
    sort: options.sortBy?.[0]?.order,
    order_by: snakeCase(options.sortBy?.[0]?.key)
  });
  adminStore.getList();
}

async function deleteAdmin(item: IAdmin, index: number) {
  const confirm = await showDialogConfirm('error', {
    title: t('admin.confirm.delete.title'),
    text: t('admin.confirm.delete.content', { admin: item.fullname })
  });
  if (!confirm) return;
  deleting[index] = true;
  try {
    const res = await adminApiService.deleteAdmin(item.id);
    if (res.success) {
      notifySuccess(t('admin.success.delete'));
      adminStore.patchItemInList(index);
    } else {
      notifyError(t('admin.error.delete'));
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    deleting[index] = false;
  }
}

onUnmounted(() => {
  adminStore.setQueryParams({});
  adminStore.setList([]);
  adminStore.setTotalItems(0);
  adminStore.setLastPage(0);
});
</script>
<template>
  <v-data-table-server
    class="pa-4"
    v-model:items-per-page="itemsPerPage"
    :items-length="adminStore.totalItems"
    :items="adminStore.list"
    height="500"
    :headers="headers"
    :loading="adminStore.isLoadingList"
    @update:options="loadItems"
  >
    <template #top>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn class="text-none me-6" color="primary" @click="() => adminStore.openDialog()">{{
          $t('common.button.add')
        }}</v-btn>
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item, index: actionIndex }">
      <div class="actions">
        <BActionButton
          icon="$common.pencil"
          :tooltip="$t('common.button.edit')"
          color="neutral"
          @click="adminStore.openDialog(item.id)"
        />
        <BActionButton
          icon="$common.trash"
          :tooltip="$t('common.button.delete')"
          color="neutral"
          :loading="deleting[actionIndex]"
          @click="deleteAdmin(item, actionIndex)"
        />
      </div>
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
