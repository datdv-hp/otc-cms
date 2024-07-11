<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DEFAULT_PER_PAGE, SortDirection } from '@/common/constants/common.constant';
import { formatDate } from '@/common/helper';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { UseSystemSettingStore } from '../../stores/system.setting.store';
import MPagination from '@/components/molecules/MPagination.vue';
import { SystemSettingType } from '../../constant';

const { t } = useI18n();
const store = UseSystemSettingStore();

const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('setting.system.fields.id'),
      key: 'id',
      minWidth: '67',
      sortable: false
    },
    {
      title: t('setting.system.fields.label'),
      key: 'label',
      minWidth: '120'
    },
    {
      title: t('setting.system.fields.valueVi'),
      key: 'valueVi',
      minWidth: '120',
      width: '30%'
    },
    {
      title: t('setting.system.fields.valueEn'),
      key: 'valueEn',
      minWidth: '120',
      width: '30%'
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

function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url));
  } catch (error) {
    return false;
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
    :page="store.queryParams.page"
    :loading="store.isLoadingList"
    @update:options="loadItems"
  >
    <template v-slot:[`item.valueVi`]="{ item }">
      <a
        v-if="item.type === SystemSettingType.FILE"
        class="link-text-highlight"
        :href="item.valueVi?.url"
        target="_blank"
        >{{ item.valueVi?.name }}</a
      >
      <span v-else-if="item.type === SystemSettingType.EDITOR" v-html="item.valueVi"></span>
      <a
        v-else-if="isValidUrl(item.valueVi)"
        class="link-text-highlight"
        :href="item.valueVi"
        target="_blank"
      >
        {{ item.valueVi }}
      </a>
      <span v-else>{{ item.valueVi }}</span>
    </template>
    <template v-slot:[`item.valueEn`]="{ item }">
      <a
        v-if="item.type === SystemSettingType.FILE"
        class="link-text-highlight"
        :href="item.valueEn?.url"
        target="_blank"
        >{{ item.valueEn?.name }}</a
      >
      <span v-else-if="item.type === SystemSettingType.EDITOR" v-html="item.valueEn"></span>
      <a
        v-else-if="isValidUrl(item.valueEn)"
        class="link-text-highlight"
        :href="item.valueEn"
        target="_blank"
      >
        {{ item.valueEn }}
      </a>
      <span v-else>{{ item.valueEn }}</span>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="actions">
        <BActionButton
          icon="$common.pencil"
          :tooltip="$t('common.button.edit')"
          color="neutral"
          @click="store.openDialog(item)"
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
