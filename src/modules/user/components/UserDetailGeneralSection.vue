<script lang="ts" setup>
import { notifyError } from '@/common/helper';
import { UserDetailSection } from '../constant';
import { UseUserStore } from '../store';
const { t } = useI18n();
const isLoading = shallowRef(false);
const open = shallowRef(UserDetailSection.General);
const userStore = UseUserStore();
const route = useRoute();
const generalInfo = computed(() => {
  const detail = userStore.detail;
  return {
    left: [
      { title: t('user.fields.telegramUsername'), value: detail?.telegramUsername },
      { title: t('user.fields.tip'), value: detail?.tip },
      { title: t('user.fields.slippage'), value: detail?.slippage },
      { title: t('user.fields.buyCustom'), value: detail?.buyCustom },
      { title: t('user.fields.antimev'), value: detail?.antimev }
    ],
    right: [
      { title: t('user.fields.referralId'), value: detail?.referralId },
      { title: t('user.fields.tipSnip'), value: detail?.tipSnip },
      { title: t('user.fields.slippageSnip'), value: detail?.slippageSnip },
      { title: t('user.fields.sellCustom'), value: detail?.sellCustom },
      { title: t('user.fields.lastClaimAt'), value: detail?.lastClaimAt }
    ]
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

onMounted(async () => {
  fetchDetail();
});
</script>
<template>
  <v-expansion-panels v-model="open" :elevation="1">
    <v-expansion-panel :value="UserDetailSection.General">
      <template #title>
        <span class="section-title">
          {{ t('user.section.generalTitle') }}
        </span>
      </template>
      <template #text>
        <template v-if="isLoading">
          <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
        </template>
        <v-row v-else>
          <v-col md="6">
            <v-row v-for="(leftItem, index) in generalInfo.left" :key="index">
              <v-col>
                <div class="item__wrapper">
                  <span class="item__title">{{ leftItem.title }}</span>
                  <span class="item__value">{{ leftItem.value }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6">
            <v-row v-for="(rightItem, index) in generalInfo.right" :key="index">
              <v-col>
                <div class="item__wrapper">
                  <span class="item__title">{{ rightItem.title }}</span>
                  <span class="item__value">{{ rightItem.value }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style lang="scss" scoped>
.item__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  .item__title {
    flex-basis: 200px;
    opacity: 0.9;
  }
  .item__value {
    flex-basis: 200px;
    font-weight: 600;
  }
}
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
</style>
