<script lang="ts" setup>
import { SupportLanguage, SupportTheme } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import { useLocale, useTheme } from 'vuetify';

const theme = useTheme();
const { t, locale } = useI18n();
const { current: vuetifyLocale } = useLocale();

const themeIcon = () => {
  return theme.name.value === SupportTheme.DARK ? '$sidebar.light-mode' : '$sidebar.dark-mode';
};
function toggleTheme() {
  const newTheme = theme.name.value === SupportTheme.DARK ? SupportTheme.LIGHT : SupportTheme.DARK;
  theme.global.name.value = newTheme;
  localStorageAuthService.setTheme(newTheme);
}
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
    <v-btn
      :icon="themeIcon()"
      size="28"
      height="28"
      class="rounded theme-icon text-none"
      variant="outlined"
      @click="toggleTheme"
    ></v-btn>
  </v-footer>
</template>
<style lang="scss" scoped>
.theme-icon {
  font-size: 11px;
}
</style>
