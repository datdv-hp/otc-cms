import { PageName } from '@/common/constants/common.constant';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import i18n from '@/plugins/vue-i18n';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: EmptyLayout,
    children: [
      {
        path: 'sign-in',
        name: PageName.SIGN_IN_PAGE,
        component: () => import('@/modules/auth/pages/SignInPage.vue'),
        meta: {
          requiresAuth: false,
          onlyWhenLoggedOut: true
        }
      }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'profile',
        name: PageName.PROFILE_PAGE,
        component: () => import('@/modules/auth/pages/ProfilePage.vue'),
        meta: {
          requiresAuth: true,
          breadcrumbs: [{ title: i18n.global.t('auth.breadcrumb.profile') }]
        }
      }
    ]
  }
];

export default routes;
