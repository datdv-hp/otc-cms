import { PageName } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const {
    public: isPublic,
    onlyWhenLoggedOut
  }: {
    public?: boolean;
    onlyWhenLoggedOut?: boolean;
    requiredPermissions?: string | string[];
  } = to?.meta || {};
  const hasToken = !!localStorageAuthService.getAccessToken();
  if ((!hasToken && !isPublic) || !from.name) {
    if (to.name !== PageName.SIGN_IN_PAGE) {
      sessionStorage.setItem('redirect', to.fullPath);
      return next({ name: PageName.SIGN_IN_PAGE });
    }
    return next();
  }
  if (isPublic) {
    // Do not allow user to visit entry page if they are logged in
    if (hasToken && onlyWhenLoggedOut) {
      return next({ name: PageName.HOME_PAGE });
    }
  }

  if (hasToken) {
    // TODO: Check if user has required permissions
    const hasPermission = true;
    if (!hasPermission) {
      return next({ name: PageName.FORBIDDEN_PAGE });
    }
  }

  return next();
};
