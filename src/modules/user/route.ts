import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import i18n from '@/plugins/vue-i18n';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: MainLayout,
    children: [
      {
        path: '',
        name: PageName.USER_LIST_PAGE,
        component: () => import('@/modules/user/pages/UserListPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('user.breadcrumb.list') }]
        }
      },
      {
        path: ':id',
        name: PageName.USER_DETAIL_PAGE,
        component: () => import('@/modules/user/pages/UserDetailPage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              title: i18n.global.t('user.breadcrumb.list'),
              to: { name: PageName.USER_LIST_PAGE }
            },
            { title: i18n.global.t('user.breadcrumb.detail') }
          ]
        }
      }
    ]
  }
];

export default routes;
