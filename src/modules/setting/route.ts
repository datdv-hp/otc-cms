import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import SettingCashbackPage from './pages/SettingCashbackPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'setting',
        name: PageName.SETTING_CASHBACK_PAGE,
        component: SettingCashbackPage,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
