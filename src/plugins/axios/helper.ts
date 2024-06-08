import { PageName } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import router from '../vue-router';

export const logout = async (redirectToLogin = true) => {
  localStorageAuthService.resetAll();
  const currentPage = router.currentRoute.value;

  if (redirectToLogin && currentPage.name !== PageName.SIGN_IN_PAGE) {
    sessionStorage.setItem('redirect', currentPage.fullPath);
  }
  await router.push({ name: PageName.SIGN_IN_PAGE });
};
