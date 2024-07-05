import { SupportLanguage } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import { createVuetify, type IconAliases } from 'vuetify';
import { aliases as defaultAliases, mdi } from 'vuetify/iconsets/mdi';
import customIcons from './custom-icons';
import defaults from './defaults';

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import './styles/index.scss';

import { customVuetifyEn } from './locale/en/vuetify.en';
import { customVuetifyVi } from './locale/vi/vuetify.vi';
import theme from './theme';
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
  theme,
  defaults: defaults,
  locale: {
    locale: localStorageAuthService.getLanguage(),
    fallback: SupportLanguage.EN,
    messages: { vi: customVuetifyVi, en: customVuetifyEn }
  }
});

export default Vuetify;
