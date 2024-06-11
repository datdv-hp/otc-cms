import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import SettingCashbackPage from './pages/SettingCashbackPage.vue';
import SettingEncourageTradingPage from './pages/SettingEncourageTradingPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'cashback-setting',
        name: PageName.SETTING_CASHBACK_PAGE,
        component: SettingCashbackPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'trading-setting',
        name: PageName.SETTING_ENCOURAGE_TRADING_PAGE,
        component: SettingEncourageTradingPage,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
