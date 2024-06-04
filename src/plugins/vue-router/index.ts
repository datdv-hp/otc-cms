import { PageName } from '@/common/constants/common.constant';
import {
  createRouter,
  createWebHistory,
  type NavigationGuardWithThis,
  type RouteRecordRaw
} from 'vue-router';
import AuthMiddleware from './authMiddleware';
import moduleRoutes from './auto-load-route';
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: { name: PageName.HOME_PAGE }
  },
  ...moduleRoutes,
  {
    path: '/404',
    name: PageName.NOT_FOUND_PAGE,
    component: () => import('@/modules/error/pages/NotFoundPage.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to?.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    return {
      top: 0,
      behavior: 'smooth'
    };
  }
});

router.beforeEach(
  VueRouteMiddleware({
    [GLOBAL_MIDDLEWARE_NAME]: AuthMiddleware
  }) as NavigationGuardWithThis<unknown>
);

export default router;
