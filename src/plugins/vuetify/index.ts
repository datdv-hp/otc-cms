import '@mdi/font/css/materialdesignicons.css';
import { createVuetify, type IconAliases } from 'vuetify';
import { aliases as defaultAliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import customIcons from './custom-icons';
import './styles/index.scss';
import { lightTheme } from './themes';
import localStorageAuthService from '@/common/storages/authStorage';
import { SupportLanguage } from '@/common/constants/common.constant';
import { vi, en } from 'vuetify/locale';
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
    defaultTheme: localStorageAuthService.getTheme()
    // themes: {
    //   light: lightTheme
    //   // dark: darkTheme
    // }
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
