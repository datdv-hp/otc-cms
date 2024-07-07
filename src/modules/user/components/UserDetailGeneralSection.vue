<script lang="ts" setup>
import { notifyError, notifySuccess } from '@/common/helper';
import { UseUserStore } from '../store';
import UserGeneralInformationItem from './UserGeneralInformationItem.vue';
import { UserStatus } from '../constant';
import { userApiService } from '../api';
import { toUserDetail } from '../helper';
import { PageName } from '@/common/constants/common.constant';
const { t } = useI18n();
const isLoading = shallowRef(false);
const userStore = UseUserStore();
const route = useRoute();
const router = useRouter();
const submitting = reactive({
  status: false
});
const generalInfo = computed(() => {
  return {
    left: [
      {
        title: t('user.fields.telegramUsername'),
        value: userStore.detail?.telegramUsername,
        href: `https://t.me/${userStore.detail?.telegramUsername}`
      },
      { title: t('user.fields.tip'), value: userStore.detail?.tip },
      { title: t('user.fields.slippage'), value: userStore.detail?.slippage },
      { title: t('user.fields.buyCustom'), value: userStore.detail?.buyCustom },
      { title: t('user.fields.antimev'), value: userStore.detail?.antimev }
    ],
    right: [
      { title: t('user.fields.referralId'), value: userStore.detail?.referralId },
      { title: t('user.fields.tipSnip'), value: userStore.detail?.tipSnip },
      { title: t('user.fields.slippageSnip'), value: userStore.detail?.slippageSnip },
      { title: t('user.fields.sellCustom'), value: userStore.detail?.sellCustom },
      { title: t('user.fields.lastClaimAt'), value: userStore.detail?.lastClaimAt }
    ]
  };
});
const actions = computed(() => {
  if (userStore.detail?.status === UserStatus.ACTIVE) {
    return {
      icon: '$common.lock',
      tooltip: t('user.tooltip.ban')
    };
  }
  return {
    icon: '$common.unlock',
    tooltip: t('user.tooltip.unban')
  };
});

async function fetchDetail() {
  isLoading.value = true;
  try {
    await userStore.getDetail(+route.params.id as number);
  } catch {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    isLoading.value = false;
  }
}

async function changeStatus() {
  const id = userStore.detail?.id;
  if (!id) return;
  submitting.status = true;
  try {
    const isActive = userStore.detail?.status === UserStatus.ACTIVE;
    const res = isActive ? await userApiService.banUser(id) : await userApiService.unbanUser(id);
    if (res.success) {
      notifySuccess(isActive ? t('user.success.ban') : t('user.success.unban'));
      userStore.setDetail(toUserDetail(res.data));
    } else {
      notifyError(res.message || (isActive ? t('user.success.ban') : t('user.success.unban')));
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    submitting.status = false;
  }
}

function openCashbackConfigPopup() {
  const id = userStore.detail?.id;
  if (!id) return;
  userStore.openRefundDialog(id as number);
}

function goToTransaction() {
  const id = userStore.detail?.id;
  if (!id) return;
  router.push({ name: PageName.USER_TRANSACTION_PAGE, params: { id: id.toString() } });
}

onMounted(async () => {
  fetchDetail();
});
</script>
<template>
  <v-card class="pa-2">
    <v-card-title class="d-flex justify-space-between flex-wrap">
      <span class="section-title">
        {{ t('user.section.generalTitle') }}
      </span>
      <div class="actions">
        <BActionButton
          :icon="actions.icon"
          :tooltip="actions.tooltip"
          color="neutral"
          :loading="submitting.status"
          @click="changeStatus"
        />
        <BActionButton
          icon="$common.tune"
          :tooltip="$t('user.tooltip.configCashback')"
          color="neutral"
          @click="openCashbackConfigPopup"
        />
        <BActionButton
          icon="$common.transaction"
          :tooltip="$t('user.tooltip.transactionDetail')"
          color="neutral"
          @click="goToTransaction"
        />
      </div>
    </v-card-title>
    <v-divider class="mt-2 mb-4" />
    <v-card-text>
      <v-skeleton-loader type="table-row@5" v-if="isLoading"></v-skeleton-loader>
      <v-row v-else>
        <v-col cols="12" sm="6">
          <v-row v-for="(leftItem, index) in generalInfo.left" :key="index">
            <v-col cols="12"><UserGeneralInformationItem v-bind="leftItem" /> </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row v-for="(rightItem, index) in generalInfo.right" :key="index">
            <v-col cols="12"><UserGeneralInformationItem v-bind="rightItem" /></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped>
.section-title {
  font-size: 1.3em;
  font-weight: 600;
}
.avatar {
  font-size: 80px;
  min-width: 144px;
}
.actions {
  display: flex;
  align-items: center;
}
</style>
