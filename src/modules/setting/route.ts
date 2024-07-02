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
        name: PageName.CASHBACK_SETTING_PAGE,
        component: () => import('@/modules/setting/pages/CashbackSettingPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('setting.breadcrumb.cashback') }]
        }
      },
      {
        path: 'award-setting',
        name: PageName.AWARD_SETTING_PAGE,
        component: () => import('@/modules/setting/pages/AwardSettingPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('setting.breadcrumb.award') }]
        }
      },
      {
        path: 'system-setting',
        name: PageName.SYSTEM_SETTING_PAGE,
        component: () => import('@/modules/setting/pages/SystemSettingPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('setting.breadcrumb.system') }]
        }
      }
    ]
  }
];

export default routes;
