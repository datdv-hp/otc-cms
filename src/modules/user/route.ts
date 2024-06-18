import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import UserListPage from './pages/UserListPage.vue';
import UserDetailPage from './pages/UserDetailPage.vue';
import i18n from '@/plugins/vue-i18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: MainLayout,
    children: [
      {
        path: '',
        name: PageName.USER_LIST_PAGE,
        component: UserListPage,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              title: i18n.global.t('user.breadcrumb.list'),
              active: false
            }
          ]
        }
      },
      {
        path: ':id',
        name: PageName.USER_DETAIL_PAGE,
        component: UserDetailPage,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              title: i18n.global.t('user.breadcrumb.list'),
              to: { name: PageName.USER_LIST_PAGE }
            },
            {
              title: i18n.global.t('user.breadcrumb.detail')
            }
          ]
        }
      }
    ]
  }
];

export default routes;
