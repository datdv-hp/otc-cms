import { PageName } from '@/common/constants/common.constant';
import MainLayout from '@/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import AdminListPage from './pages/AdminListPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'admin',
        name: PageName.ADMIN_LIST_PAGE,
        component: AdminListPage,
        meta: {
          requiresAuth: true
        }
        // children: [
        //   {
        //     path: ':id',
        //     name: PageName.USER_DETAIL_PAGE,
        //     component: UserDetailPage,
        //     meta: {
        //       requiresAuth: true
        //     }
        //   }
        // ]
      }
    ]
  }
];

export default routes;
