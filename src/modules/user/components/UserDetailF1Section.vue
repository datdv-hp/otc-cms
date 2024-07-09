<script lang="ts" setup>
import { DEFAULT_PER_PAGE, PageName } from '@/common/constants/common.constant';
import { notifyError, notifySuccess } from '@/common/helper';
import { StatusColor } from '@/modules/admin/constant';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { userApiService } from '../api';
import { UserStatus } from '../constant';
import { UseUserStore } from '../store';
import { IUserListItem } from '../type';
import MPagination from '@/components/molecules/MPagination.vue';

const { t } = useI18n();
const loading = shallowRef(false);
const store = UseUserStore();
const router = useRouter();
const submittingStatus = reactive<Record<string, boolean>>({});
const route = useRoute();

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
      minWidth: '140',
      width: '20%'
    },
    {
      title: t('user.fields.transactionToday'),
      key: 'transactionToday',
      minWidth: '180'
    },
    {
      title: t('user.fields.lastTransactionAt'),
      key: 'lastTransactionAt',
      minWidth: '180'
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
      sortable: false
    }
  ];
});
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

const itemPerPage = computed({
  get: () => store.queryParams.per_page || DEFAULT_PER_PAGE,
  set: (value: number) => {
    store.patchQueryParams({ per_page: value });
  }
});

function toDetail(item: IUserListItem) {
  router.push({ name: PageName.USER_DETAIL_PAGE, params: { id: item.id } });
}

async function loadItems(options: { page: number; itemsPerPage: number }) {
  loading.value = true;
  try {
    store.patchQueryParams({
      page: options.page,
      per_page: options.itemsPerPage,
      parent_id: +route.params.id as number
    });
    await store.getList();
  } finally {
    loading.value = false;
  }
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
  store.openRefundDialog(item.id as number);
}
</script>
<template>
  <v-card class="pa-2">
    <v-card-title>
      <span class="section-title">
        {{ t('user.section.f1Title') }}
      </span>
    </v-card-title>
    <v-divider class="mt-2 mb-4" />
    <v-card-text class="table-wrapper">
      <v-data-table-server
        v-model:items-per-page="itemPerPage"
        :items-length="store.totalItems"
        :items="store.list"
        :page="store.queryParams.page"
        :headers="headers"
        :loading="loading"
        @update:options="loadItems"
      >
        <template v-slot:loading>
          <v-skeleton-loader :type="`table-row@${itemPerPage}`"></v-skeleton-loader>
        </template>
        <template v-slot:[`item.index`]="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-slot:[`item.telegramUsername`]="{ item }">
          <a
            class="link-text-highlight"
            :href="`https://t.me/${item.telegramUsername}`"
            target="_blank"
            >{{ item.telegramUsername }}</a
          >
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
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped>
.section-title {
  font-size: 1.3em;
  font-weight: 600;
}

.table-wrapper {
  padding: 12px;
}
</style>
