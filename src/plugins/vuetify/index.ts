import { SupportLanguage, SupportTheme } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify, type IconAliases } from 'vuetify';
import { aliases as defaultAliases, mdi } from 'vuetify/iconsets/mdi';
import { en, vi } from 'vuetify/locale';
import 'vuetify/styles';
import customIcons from './custom-icons';
import './styles/index.scss';
const aliases: IconAliases = {
  ...defaultAliases,
  ...customIcons
};

const Vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: localStorageAuthService.getTheme() || SupportTheme.LIGHT
  },
  defaults: {
    global: {
      ripple: false
    }
  },
  locale: {
    locale: localStorageAuthService.getLanguage(),
    fallback: SupportLanguage.EN,
    messages: { vi, en }
  }
});

export default Vuetify;
