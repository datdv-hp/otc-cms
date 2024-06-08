import type { IUserProfile, IUserPermission } from '@/modules/auth/types';
import { DEFAULT_LANGUAGE, SupportLanguage } from '../constants/common.constant';
import { isStringify } from '../helper';
import { storage } from './localStorage';

const BUFFER_TIME = 60 * 1000; // 60s

export const enum AUTH_SERVICE_KEY {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  USER = 'USER',
  ROLE = 'ROLE',
  LANGUAGE = 'LANGUAGE'
}
class LocalStorageAuthService {
  setAuthTokens(tokens: { accessToken: string; refreshToken: string } | null): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, tokens?.accessToken || '');
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, tokens?.refreshToken || '');
  }
  // ACCESS_TOKEN
  setAccessToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
  }
  getAccessToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
  }
  resetAccessToken(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
  }
  // ACCESS_TOKEN
  setRefreshToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
  }
  getRefreshToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
  }
  resetRefreshToken(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, '');
  }

  // LANGUAGE
  setLanguage(value: SupportLanguage): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.LANGUAGE, value);
  }
  getLanguage(): SupportLanguage {
    return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
      DEFAULT_LANGUAGE) as SupportLanguage;
  }

  // LOGIN USER
  setLoginUser(user: null | IUserProfile, role: IUserPermission | null): void {
    if (!user) {
      storage.setLocalStorage(AUTH_SERVICE_KEY.USER, '');
    }
    if (!isStringify(user)) {
      return;
    }
    storage.setLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
    storage.setLocalStorage(AUTH_SERVICE_KEY.ROLE, JSON.stringify(role));
  }
  getLoginUser(): IUserProfile {
    return storage.getObjectFromKey(AUTH_SERVICE_KEY.USER) as IUserProfile;
  }

  getUserPermission() {
    return storage.getObjectFromKey(AUTH_SERVICE_KEY.ROLE) as IUserPermission;
  }

  getHeader() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Accept-Language': this.getLanguage() || DEFAULT_LANGUAGE
    };
  }

  resetAll(): void {
    this.resetAccessToken();
    this.resetRefreshToken();
    this.setLoginUser(null, null);
  }
}

export const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
