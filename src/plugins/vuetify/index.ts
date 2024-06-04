import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify, type IconAliases } from 'vuetify';
import { aliases as defaultAliases, mdi } from 'vuetify/iconsets/mdi';
import './styles/index.scss';
import customIcons from './custom-icons';
import { darkTheme, lightTheme } from './themes';
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
    themes: {
      light: lightTheme,
      dark: darkTheme
    }
  },
  defaults: {
    global: {
      ripple: false
    }
  }
});

export default Vuetify;
