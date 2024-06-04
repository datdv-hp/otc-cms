import { PageName } from '@/common/constants/common.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
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
  const loggedIn = !!localStorageAuthService.getAccessToken();
  if (isPublic) {
    // Do not allow user to visit entry page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
      return next({ name: PageName.HOME_PAGE });
    }
    return next();
  }

  if (loggedIn) {
    // TODO: Check if user has required permissions
    const hasPermission = true;
    if (!hasPermission) {
      return next({ name: PageName.FORBIDDEN_PAGE });
    }
  }
  return next();
};
