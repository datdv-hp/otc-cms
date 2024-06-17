import { DEFAULT_LANGUAGE } from '@/common/constants/common.constant';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import localStorageAuthService from '@/common/storages/authStorage';

const i18n = createI18n({
  locale: localStorageAuthService.getLanguage(), // set locale
  fallbackLocale: DEFAULT_LANGUAGE, // set fallback locale
  messages: messages, // set locale messages
  globalInjection: true,
  legacy: false,
  sync: true
});

export default i18n;
