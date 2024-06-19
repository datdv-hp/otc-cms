<script lang="ts" setup>
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
    <v-expansion-panel :value="UserDetailSection.General" :title="t('user.section.generalTitle')">
      <template #text>
        <template v-if="isLoading">
          <v-skeleton-loader type="text@5"></v-skeleton-loader>
        </template>
        <v-row v-else>
          <v-col sm="6">
            <v-row v-for="(leftItem, index) in generalInfo.left" :key="index">
              <v-col>
                <div class="item__wrapper">
                  <span class="item__title">{{ leftItem.title }}</span>
                  <span class="item__default">{{ leftItem.value }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col sm="6">
            <v-row v-for="(rightItem, index) in generalInfo.right" :key="index">
              <v-col>
                <div class="item__wrapper">
                  <span class="item__title">{{ rightItem.title }}</span>
                  <span class="item__default">{{ rightItem.value }}</span>
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
  .item__title {
    flex-basis: 160px;
  }
}
</style>
