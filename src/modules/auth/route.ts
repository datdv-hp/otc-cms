import { PageName } from '@/common/constants/common.constant';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
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
          requiresAuth: true,
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
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
