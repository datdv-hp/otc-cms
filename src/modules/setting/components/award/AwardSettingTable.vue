<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DEFAULT_PER_PAGE, SortDirection } from '@/common/constants/common.constant';
import { formatDate, notifyError, notifySuccess } from '@/common/helper';
import { showDialogConfirm } from '@/plugins/vuetify/dialog-confirm/util';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { awardSettingServiceApi } from '../../api';
import { UseAwardSettingStore } from '../../stores/award-setting.store';
import { IAwardSetting } from '../../type';

const { t } = useI18n();
const store = UseAwardSettingStore();
const deleting = reactive<Record<string, boolean>>({});
const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('setting.award.fields.id'),
      key: 'id',
      minWidth: '56',
      sortable: false
    },
    {
      title: t('setting.award.fields.name'),
      key: 'name',
      minWidth: '160'
    },
    {
      title: t('setting.award.fields.stepValue'),
      key: 'stepValue',
      minWidth: '160'
    },
    {
      title: t('setting.award.fields.description'),
      key: 'description',
      sortable: false,
      minWidth: '160'
    },
    {
      title: t('setting.award.fields.createdAt'),
      key: 'createdAt',
      minWidth: '220',
      value: (item) => formatDate(item.createdAt)
    },
    {
      title: t('setting.award.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false,
      align: 'center'
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

async function deleteCashbackSetting(item: IAwardSetting, index: number) {
  const confirm = await showDialogConfirm('error', {
    title: t('setting.award.confirm.delete.title'),
    text: t('setting.award.confirm.delete.content', { award: item.name })
  });
  if (!confirm) return;
  deleting[index] = true;
  try {
    const res = await awardSettingServiceApi.deleteAwardSetting(item.id);
    if (res.success) {
      notifySuccess(t('setting.award.success.delete'));
      store.patchItemInList(index);
    } else {
      notifyError(t('setting.award.error.delete'));
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    deleting[index] = false;
  }
}

onUnmounted(() => {
  store.setQueryParams({});
  store.setList([]);
  store.setTotalItems(0);
  store.setLastPage(0);
});
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :items-length="store.totalItems"
    :items="store.list"
    :headers="headers"
    :loading="store.isLoadingList"
    @update:options="loadItems"
  >
    <template v-slot:[`item.actions`]="{ item, index: actionIndex }">
      <div class="actions">
        <BActionButton
          icon="$common.pencil"
          :tooltip="$t('common.button.edit')"
          color="neutral"
          @click="store.openDialog(item.id)"
        />
        <BActionButton
          icon="$common.trash"
          :tooltip="$t('common.button.delete')"
          color="neutral"
          :loading="deleting[actionIndex]"
          @click="deleteCashbackSetting(item, actionIndex)"
        />
      </div>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemsPerPage}`"></v-skeleton-loader>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped></style>
