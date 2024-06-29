<script lang="ts" setup>
import { SupportLanguage } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import { useLocale } from 'vuetify';

const { t, locale } = useI18n();
const { current: vuetifyLocale } = useLocale();

function toggleLanguage() {
  const newLocale = locale.value === SupportLanguage.EN ? SupportLanguage.VI : SupportLanguage.EN;
  locale.value = newLocale;
  localStorageAuthService.setLanguage(newLocale);
  vuetifyLocale.value = newLocale;
}
</script>
<template>
  <v-footer name="footer" app>
    <v-spacer></v-spacer>
    <v-btn
      :text="t(`app.lang.${locale}`)"
      append-icon="$sidebar.language"
      height="28"
      class="rounded theme-icon text-none"
      variant="text"
      @click="toggleLanguage"
    ></v-btn>
  </v-footer>
</template>
<style lang="scss" scoped>
.theme-icon {
  font-size: 11px;
}
</style>
