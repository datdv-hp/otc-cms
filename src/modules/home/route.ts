import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from './pages/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'home',
        name: PageName.HOME_PAGE,
        component: HomePage,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
