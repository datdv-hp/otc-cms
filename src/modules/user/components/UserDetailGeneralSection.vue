<script lang="ts" setup>
import { UserDetailSection } from '../constant';
import { UseUserStore } from '../store';
const { t } = useI18n();
const isLoading = shallowRef(false);
const open = shallowRef(UserDetailSection.General);
const userStore = UseUserStore();
const generalInfo = computed(() => {
  const detail = userStore.detail;
  return {
    left: [{ title: t('user.fields.telegramId'), value: detail?.telegramId }],
    right: [{ title: t('user.fields.referralId'), value: detail?.referralId }]
  };
});
</script>
<template>
  <v-expansion-panels v-model="open" :elevation="1">
    <v-expansion-panel :value="UserDetailSection.General" :title="t('user.section.generalTitle')">
      <template #text>
        <template v-if="isLoading">
          <v-skeleton-loader type="text@5"></v-skeleton-loader>
        </template>
        <v-row else>
          <v-col sm="6">
            <v-row>
              <v-col></v-col>
            </v-row>
          </v-col>
          <v-col sm="6">
            <v-row>
              <v-col></v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style lang="scss" scoped></style>
