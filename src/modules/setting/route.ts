import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import i18n from '@/plugins/vue-i18n';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'cashback-setting',
        name: PageName.SETTING_CASHBACK_PAGE,
        component: () => import('@/modules/setting/pages/SettingCashbackPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('setting.breadcrumb.cashback') }]
        }
      },
      {
        path: 'award-setting',
        name: PageName.SETTING_AWARD_PAGE,
        component: () => import('@/modules/setting/pages/SettingAwardPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('setting.breadcrumb.award') }]
        }
      }
    ]
  }
];

export default routes;
