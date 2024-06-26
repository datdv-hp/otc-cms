<!-- eslint-disable vue/valid-v-slot -->
<script lang="ts" setup>
import { DEFAULT_PER_PAGE, PageName, SortDirection } from '@/common/constants/common.constant';
import { notifyError, notifySuccess } from '@/common/helper';
import { StatusColor } from '@/modules/admin/constant';
import { snakeCase } from 'lodash';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { userApiService } from '../api';
import { UserStatus } from '../constant';
import { UseUserStore } from '../store';
import { IUserListItem } from '../type';

const { t } = useI18n();
const router = useRouter();
const store = UseUserStore();
const submittingStatus = reactive<Record<string, boolean>>({});

const headers = computed<VDataTableServer['$props']['headers']>(() => {
  return [
    {
      title: t('user.fields.index'),
      key: 'index',
      width: '50',
      minWidth: '50',
      maxWidth: '50',
      align: 'center',
      sortable: false
    },
    {
      title: t('user.fields.telegramUsername'),
      key: 'telegramUsername',
      fixed: true,
      minWidth: '140'
    },
    {
      title: t('user.fields.transactionToday'),
      key: 'transactionToday',
      minWidth: '180'
    },
    {
      title: t('user.fields.lastTransactionAt'),
      key: 'lastTransactionAt',
      minWidth: '180',
      sortable: false
    },
    {
      title: t('user.fields.lastClaimAt'),
      key: 'lastClaimAt',
      minWidth: '180',
      sortable: false
    },
    {
      title: t('user.fields.f1Count'),
      key: 'f1Count',
      minWidth: '100',
      sortable: false
    },
    {
      title: t('user.fields.status'),
      key: 'status',
      minWidth: '160',
      align: 'center',
      sortable: false
    },
    {
      title: t('user.fields.actions'),
      key: 'actions',
      minWidth: '160',
      sortable: false,
      align: 'center'
    }
  ];
});

const itemPerPage = computed({
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

function toDetail(item: IUserListItem) {
  router.push({ name: PageName.USER_DETAIL_PAGE, params: { id: item.id } });
}

async function changeStatus(item: IUserListItem, index: number) {
  submittingStatus[index] = true;
  try {
    const isActive = item.status === UserStatus.ACTIVE;
    const res = isActive
      ? await userApiService.banUser(item.id)
      : await userApiService.unbanUser(item.id);
    if (res.success) {
      notifySuccess(isActive ? t('user.success.ban') : t('user.success.unban'));
      store.patchUserStatusInList(index, res.data.status);
    } else {
      notifyError(res.message || (isActive ? t('user.success.ban') : t('user.success.unban')));
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    submittingStatus[index] = false;
  }
}

function openCashbackConfigPopup(item: IUserListItem) {
  // TODO: Open cashback config popup
  console.log(item);
}

const actions = computed(() => ({
  [UserStatus.ACTIVE]: {
    icon: '$common.lock',
    tooltip: t('user.tooltip.ban')
  },
  [UserStatus.INACTIVE]: {
    icon: '$common.unlock',
    tooltip: t('user.tooltip.unban')
  }
}));

onUnmounted(() => {
  store.setQueryParams({});
  store.setList([]);
  store.setTotalItems(0);
  store.setLastPage(0);
});

defineExpose({
  loadItems
});
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemPerPage"
    :items-length="store.totalItems"
    fixed-header
    :items="store.list"
    :headers="headers"
    :loading="store.isLoadingList"
    @update:options="loadItems"
  >
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${itemPerPage}`"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.index`]="{ index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template v-slot:[`item.telegramUsername`]="{ item }">
      <a class="username" :href="`https://t.me/${item.telegramUsername}`" target="_blank">{{
        item.telegramUsername
      }}</a>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        density="compact"
        :color="StatusColor[item.status]"
        :text="t(`admin.status.${item.status}`)"
      ></v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item, index: actionIndex }">
      <div class="actions">
        <BActionButton
          icon="$common.open"
          :tooltip="$t('user.tooltip.detail')"
          color="neutral"
          @click="toDetail(item)"
        />
        <BActionButton
          :icon="actions[item.status].icon"
          :tooltip="actions[item.status].tooltip"
          color="neutral"
          :loading="submittingStatus[`${actionIndex}`]"
          @click="changeStatus(item, actionIndex)"
        />
        <BActionButton
          icon="$common.tune"
          :tooltip="$t('user.tooltip.configCashback')"
          color="neutral"
          @click="openCashbackConfigPopup(item)"
        />
      </div>
    </template>
  </v-data-table-server>
</template>
<style lang="scss" scoped>
:deep(.v-table) {
  min-height: 300px;
}
.username {
  text-decoration: none;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  transition: font-size 0.1s linear;
  &:hover {
    font-size: 1.02em;
    text-decoration: underline;
  }
}
</style>
