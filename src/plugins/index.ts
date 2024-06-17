import type { App } from 'vue';
import pinia from './pinia';
import i18n from './vue-i18n';
import router from './vue-router';
import vuetify from './vuetify';

export const initPlugins = (app: App) => {
  i18n.install(app);
  app.use(pinia);
  app.use(router);
  app.use(vuetify);
};
