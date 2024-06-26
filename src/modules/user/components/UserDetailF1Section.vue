<script lang="ts" setup>
import { DEFAULT_PER_PAGE, PageName } from '@/common/constants/common.constant';
import { notifyError, notifySuccess } from '@/common/helper';
import { StatusColor } from '@/modules/admin/constant';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import { userApiService } from '../api';
import { UserDetailSection, UserStatus } from '../constant';
import { UseUserStore } from '../store';
import { IUserListItem } from '../type';

const { t } = useI18n();
const loading = shallowRef(false);
const store = UseUserStore();
const route = useRoute();
const router = useRouter();
const open = shallowRef(UserDetailSection.F1);
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
      per_page: options.itemsPerPage
      // parent_id: +route.params.id as number
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
  // TODO: Open cashback config popup
  console.log(item);
}
</script>
<template>
  <v-expansion-panels v-model="open" :elevation="1">
    <v-expansion-panel :value="UserDetailSection.F1">
      <template #title>
        <span class="section-title">
          {{ t('user.section.f1Title') }}
        </span>
      </template>
      <template #text>
        <v-data-table-server
          v-model:items-per-page="itemPerPage"
          :items-length="store.totalItems"
          fixed-header
          :items="store.list"
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
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style lang="scss" scoped>
:deep(.v-expansion-panel-title) {
  transition: border-bottom-color 0.3s ease;
  border-bottom: 1px solid transparent;
  &.v-expansion-panel-title--active {
    border-bottom-color: rgba(var(--v-theme-on-surface));
  }
}
:deep(.v-expansion-panel-text__wrapper) {
  padding: 1.5rem;
}
.section-title {
  font-size: 1.3rem;
  font-weight: 600;
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
