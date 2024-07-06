<script lang="ts" setup>
import { DEFAULT_PER_PAGE, SortDirection } from '@/common/constants/common.constant';
import { formatDate, notifyError, notifySuccess } from '@/common/helper';
import MPagination from '@/components/molecules/MPagination.vue';
import { showDialogConfirm } from '@/plugins/vuetify/dialog-confirm/util';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { cashbackSettingServiceApi } from '../../api';
import { UseCashbackSettingStore } from '../../stores/cashback-setting.store';
import { ICashbackSetting } from '../../type';

const { t } = useI18n();
const store = UseCashbackSettingStore();
const deleting = reactive<Record<string, boolean>>({});
const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('setting.cashback.fields.id'),
      key: 'id',
      minWidth: '67',
      sortable: false
    },
    {
      title: t('setting.cashback.fields.name'),
      key: 'name',
      minWidth: '160'
    },
    {
      title: t('setting.cashback.fields.percent'),
      key: 'percent',
      minWidth: '120'
    },
    {
      title: t('setting.cashback.fields.createdAt'),
      key: 'createdAt',
      minWidth: '180',
      sortable: false,
      value: (item) => formatDate(item.createdAt)
    },
    {
      title: t('setting.cashback.fields.actions'),
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
async function deleteCashbackSetting(item: ICashbackSetting, index: number) {
  const confirm = await showDialogConfirm('error', {
    title: t('setting.cashback.confirm.delete.title'),
    text: t('setting.cashback.confirm.delete.content', { cashback: item.name })
  });
  if (!confirm) return;
  deleting[index] = true;
  try {
    const res = await cashbackSettingServiceApi.deleteCashbackSetting(item.id);
    if (res.success) {
      notifySuccess(t('setting.cashback.success.delete'));
      store.patchItemInList(index);
    } else {
      notifyError(t('setting.cashback.error.delete'));
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
    :page="store.queryParams.page"
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
    <template #bottom="{ pageCount }">
      <v-divider></v-divider>
      <MPagination
        v-model:item-per-page="store.queryParams.per_page"
        v-model:page="store.queryParams.page"
        :total-pages="pageCount"
        :disabled="store.isLoadingList"
        :loading="store.isLoadingList"
      ></MPagination>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped></style>
